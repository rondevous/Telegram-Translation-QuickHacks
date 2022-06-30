# Basic Info
"""
This script is a random value generator for a TEST/dustbin language
It supports Telegram translation files of type .xml and .strings
>--		Head over to t.me/TranslationTools for more tools 		--<
"""

import random as rd
import argparse
import os
import re
import time
import xml.etree.ElementTree as ET

# Variables
global tree, total, skipped
total = 0
skipped = list()

# RegExps
req_quotes = re.compile(r"\\'.*\\'.*HH:mm")  # \'Sample Text\' HH:mm

# TDesktop Markup tokens, needing to enclose one or more text entities
TokensExtraTDesktop = re.compile(r'\[a href=\".*\"\]|\[\/?[A-Za-z]\]')

# Android Markup tokens, needing to enclose one or more text entities
TokensExtraAndroid = re.compile(r'<!\[CDATA\[(?:<a href=\")?.*">|(?:<\/a>)?\]\]>')
# results in a pair-match
# let href='' hold the same old value

def isXML(file):
	"""Checks if a file is in .XML format
	"""
	try:
		global tree
		tree = ET.parse(file)
	except:
		return False
	else:
		print("----\nProcessing: ", file)
		return True


def isStrings(file):
	"""Checks if a file is in .strings format
	"""
	global dot_strings
	try:
		dot_strings = open(file, 'r').read()
	except:
		return False
	if len(re.findall(r'".*"\s=\s".*";', dot_strings)) > 0:
		return True


# Print summary
def printSummary():
	global strCount, outFile
	print('  '+str(strCount-1), 'strings changed')
	if len(skipped) > 0:
		print('  '+str(len(skipped)), 'skipped')
	print("  Saved to: ", outFile)


def XMLreplace(file=str, folder=None):
	""" Algo for XML replacer
	"""
	global tree, strCount, outFile
	""" tree = ET.parse(file)"""
	root = tree.getroot()  # <Element 'resources'>
	if(args.p):
		print('\n\nThese strings have been edited with random values:\n')
	strCount = 1
	for string in root.findall('string'):
		string_name = string.get('name')
		# string.text = ""+ str(rd.random())
		if TokensExtraAndroid.search(str(string.text)) != None:
			tokensExtra = TokensExtraAndroid.findall(string.text)
			extralen = len(tokensExtra) # these are pairs, so always even number
			newstring = ""
			for x in range(0, int(extralen/2)):
				newstring += tokensExtra.pop(0) + str(rd.random()) + tokensExtra.pop(0) + ' '
			string.text = escape(newstring)
		elif(req_quotes.match(str(string.text)) != None):  # strings that require "quotes"
			string.text = req_quotes.sub(
				("\\'{}\\'").format(str(rd.random())), str(string.text))
		else:
			string.text = str(rd.random())
		if(args.p):
			print('\n'+str(strCount)+'. '+string_name+'')
		strCount += 1
	outFile = str(re.sub(r'(android_x|android)(.*)\.xml',
						 r'\1_gibberish.xml', os.path.basename(file)))
	outFolder = 'gibberish (IMPORT)'
	if folder is None:
		try:
			os.mkdir(outFolder)
			print("created folder:", outFolder)
		except:
			pass
		outFile = os.path.join(outFolder, outFile)
	else:
		outFolder = os.path.join(folder, outFolder)
		try:
			os.mkdir(outFolder)
			print("created folder:", outFolder)
		except:
			pass
		outFile = os.path.join(outFolder, outFile)
	tree.write(outFile, xml_declaration=True, encoding='Unicode')
	if args.p:
		print('\nSkipped:')
		for i in range(0, len(skipped)):
			print('\t<'+skipped[i]+'>')
	printSummary()
	""" MEMORY CLEANUP  """
	re.purge()
	del string, root, tree  # xml memory


def STRINGSreplace(file=str, folder=None):
	""" Algo for .strings replacer:
	>>> # open file, copy all data, iterate and write out to a new file
	"""
	global dot_strings, strCount, outFile
	path = os.path.join(folder, file)
	print("----\nProcessing: ", path)
	dot_strings = open(path, 'r').read()
	outFile = re.sub(r'(tdesktop|macos|ios)(.*).strings',
					 r'\1_gibberish.strings', os.path.basename(file))
	outFolder = 'gibberish (IMPORT)'
	if folder is None:
		try:
			os.mkdir(outFolder)
			print("created folder:", outFolder)
		except:
			pass
		outFile = os.path.join(outFolder, outFile)
	else:
		outFolder = os.path.join(folder, outFolder)
		try:
			os.mkdir(outFolder)
			print("created folder:", outFolder)
		except:
			pass
		outFile = os.path.join(outFolder, outFile)

	new_strings = open(outFile, 'w', encoding='UTF-8')
	new_strings.write(
		'/*\nThis file was generated for importing into a TEST/dustbin language.\n*/\n')
	if args.p:
		print('\nThese strings have been edited with random values:\n')
	strCount = 0
	for match in re.finditer(r'(?<!.)"(.*)"\s=\s"(.*)";\n', dot_strings):
		strName = match.groups()[0]
		strText = match.groups()[1]
		strText = unescape(strText)
		if TokensExtraTDesktop.search(strText) != None:
			tokensExtra = TokensExtraTDesktop.findall(strText)
			extralen = len(tokensExtra) # these are pairs, so always even number
			newtxt = ""
			for x in range(0, int(extralen/2)):
				newtxt += tokensExtra.pop(0) + str(rd.random()) + tokensExtra.pop(0) + ' '
			strText = escape(newtxt)
			new_strings.write("\""+strName+"\" = \""+strText+"\";\n")
		else:
			new_strings.write("\""+strName+"\" = \""+str(rd.random())+"\";\n")
		if(args.p):
			print('\n'+str(strCount)+'. '+str(rd.random())+'')
		strCount += 1
	new_strings.close()
	printSummary()
	""" MEMORY CLEANUP  """
	re.purge()
	del dot_strings, strCount, outFile, new_strings


def escape(string):
	r"""Escape the given string so it can be included in double-quoted
	strings, like in ``PO`` files.
	>>> escape('Say:\n  \"hello, world!\"\n')
	'Say:\\n  \\"hello, world!\\"\\n'
	:param string: the string to escape
	"""
	return '%s' % string.replace('\\', '\\\\') \
		.replace('\t', '\\t') \
		.replace('\r', '\\r') \
		.replace('\n', '\\n') \
		.replace('\"', '\\"')


def unescape(string):
	r"""Reverse `escape` the given string.
	>>> unescape('"Say:\\n  \\"hello, world!\\"\\n"')
	'Say:\n  \"hello, world!\"\n'
	<BLANKLINE>
	:param string: the string to unescape
	"""
	def replace_escapes(match):
		m = match.group(1)
		if m == 'n':
			return '\n'
		elif m == 't':
			return '\t'
		elif m == 'r':
			return '\r'
		# m is \ or "
		return m
	return re.compile(r'\\([\\trn"])').sub(replace_escapes, string)


def stringnames(file=str, folder=None):
	global total, skipped
	total = 0
	skipped = list()
	temp = os.path.join(folder, file)
	if(isXML(temp)):
		XMLreplace(file, folder)
	elif(isStrings(temp)):
		STRINGSreplace(file, folder)
	else:  # invalid translation file
		print("\n\t[ ERROR ]: '" + file +
			  "\n This is not a valid translations file. Looking for .XML or .strings")
		print("\nPlease export a translation file from one of the apps at https://translations.telegram.org/en")
		print('How to export --> https://t.me/TranslationsTalk/1759)')  # FIXME


# Command-line info and argument parsing
arg_parser = argparse.ArgumentParser(
	description='Replaces translation texts with their identifiers (stringnames) using files exported from https://translations.telegram.org')
inputgroup = arg_parser.add_mutually_exclusive_group(required=True)
inputgroup.add_argument(
	'-f', '--file', metavar='language[ .xml | .strings]', type=str, required=False,
	help='The exported language file (.xml or .strings) from the translations platform')
inputgroup.add_argument(
	'-d', '--folder', metavar='folder', type=str, required=False,
	help='The folder in which the exported language files are placed in.')
arg_parser.add_argument(
	'-p', action="store_true",
	help='Show the replaced string names.')

args = arg_parser.parse_args()

if args.folder is None:
	if args.file is None:
		import sys
		sys.exit("You must specify a valid file or folder!\
			\nExample:\
			\n\tpython stringNames --file android.xml\
			\n\t\t\tOR\
			\n\tpython stringNames --folder langfiles")
	else:
		folder, file = os.path.split(str(args.file))
		stringnames(file, folder)  # str('android_lang_v1234567.xml')
else:
	folder = str(args.folder)
	if os.path.isdir(folder):
		print('Looking into folder:', folder)
		files = os.listdir(folder)
		for file in files:
			path = os.path.join(folder, file)
			if os.path.isfile(path):
				stringnames(file, folder)
				time.sleep(1)  # delay for show-off
	else:
		print('Not a folder ')
