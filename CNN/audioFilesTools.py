#!/usr/bin/python
# -*- coding: utf-8 -*-
import eyed3
import os

#Remove logs
eyed3.log.setLevel("ERROR")

def cleanFilenames(path):
	files = os.listdir(path)
	files = [file for file in files if file.endswith(".mp3")]

	for index,filename in enumerate(files):
		newName = "".join(i for i in filename if ord(i)<128)
		oldFile = os.path.join(path, filename)
		newFile = os.path.join(path, newName)
		os.rename(oldFile, newFile)
	
	print "Filenames cleaned."

def isMono(filename):
	audiofile = eyed3.load(filename)
	return audiofile.info.mode == 'Mono'

def getGenre(filename):
	audiofile = eyed3.load(filename)
	#No genre
	if not audiofile.tag.genre:
		return None
	else:
		return audiofile.tag.genre.name.encode('utf-8')