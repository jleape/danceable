# -*- coding: utf-8 -*-
from subprocess import Popen, PIPE, STDOUT
import os
from PIL import Image
import eyed3

from sliceSpectrogram import createSlicesFromSpectrograms, createSlicesFromInputSpectrograms
from audioFilesTools import isMono, getGenre
from config import rawDataPath, inputDataPath, spectrogramsInputPath
from config import spectrogramsPath
from config import pixelPerSecond

#Tweakable parameters
desiredSize = 128

#Define
currentPath = os.path.dirname(os.path.realpath(__file__)) 
tmpPath = currentPath + '/tmp/'
#Remove logs
eyed3.log.setLevel("ERROR")

#Create spectrogram from mp3 files
def createSpectrogram(filename,newFilename):
	#Create temporary mono track if needed
	if isMono(rawDataPath+filename):
		command = "cp '{}' '{}.mp3'".format(rawDataPath+filename,tmpPath+newFilename)
	else:
		command = "sox '{}' '{}.mp3' remix 1,2".format(rawDataPath+filename,tmpPath+newFilename)
	p = Popen(command, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True, cwd=currentPath)
	output, errors = p.communicate()
	if errors:
		print errors

	#Create spectrogram
	filename.replace(".mp3","")
	command = "sox '{}.mp3' -n spectrogram -Y 200 -X {} -m -r -o '{}.png'".format(tmpPath+newFilename,pixelPerSecond,spectrogramsPath+newFilename)
	p = Popen(command, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True, cwd=currentPath)
	output, errors = p.communicate()
	if errors:
		print errors

	#Remove tmp mono track
	# os.remove("{}.mp3".format(tmpPath+newFilename))

#Creates .png whole spectrograms from mp3 files
def createSpectrogramsFromAudio():
	genresID = dict()
	files = os.listdir(rawDataPath)
	files = [file for file in files if file.endswith(".mp3")]
	nbFiles = len(files)

	#Create path if not existing
	if not os.path.exists(os.path.dirname(spectrogramsPath)):
		try:
			os.makedirs(os.path.dirname(spectrogramsPath))
		except OSError as exc: # Guard against race condition
			if exc.errno != errno.EEXIST:
				raise

	#Rename files according to genre
	for index,filename in enumerate(files):
		print "Creating spectrogram for {} file {}/{}...".format(filename,index+1,nbFiles)
		fileGenre = getGenre(rawDataPath+filename)
		genresID[fileGenre] = genresID[fileGenre] + 1 if fileGenre in genresID else 1
		fileID = genresID[fileGenre]
		newFilename = fileGenre+"_"+str(fileID)
		createSpectrogram(filename,newFilename)

#Whole pipeline .mp3 -> .png slices
def createSlicesFromAudio():
	print "Creating spectrograms..."
	#dhruv: not really required. call
	createSpectrogramsFromAudio()
	print "Spectrograms created!"

	print "Creating slices..."
	createSlicesFromSpectrograms(desiredSize)
	print "Slices created!"

def createInputSpectrogram(filename,newFilename):
	#Create temporary mono track if needed
	print "In createInputSpectrogram"
	if isMono(inputDataPath+filename):
		command = "cp '{}' '{}.mp3'".format(inputDataPath+filename,tmpPath+newFilename)
	else:
		command = "sox '{}' '{}.mp3' remix 1,2".format(inputDataPath+filename,tmpPath+newFilename)

	p = Popen(command, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True, cwd=currentPath)
	output, errors = p.communicate()
	if errors:
		print errors

	#Create spectrogram
	filename.replace(".mp3","")
	command = "sox '{}.mp3' -n spectrogram -Y 200 -X {} -m -r -o '{}.png'".format(tmpPath+newFilename,pixelPerSecond,spectrogramsInputPath+newFilename)
	p = Popen(command, shell=True, stdin=PIPE, stdout=PIPE, stderr=STDOUT, close_fds=True, cwd=currentPath)
	output, errors = p.communicate()
	if errors:
		print errors

	#Remove tmp mono track
	# os.remove("{}.mp3".format(tmpPath+newFilename))

def createSpectrogramsFromInputAudio():
	files = os.listdir(inputDataPath)
	files = [file for file in files if file.endswith(".mp3")]
	nbFiles = len(files)

	#Create path if not existing
	if not os.path.exists(os.path.dirname(spectrogramsInputPath)):
		try:
			os.makedirs(os.path.dirname(spectrogramsInputPath))
		except OSError as exc: # Guard against race condition
			if exc.errno != errno.EEXIST:
				raise

	#Rename files according to genre
	for index,filename in enumerate(files):
		print "Creating spectrogram for file {}/{}...".format(filename,index+1,nbFiles)
		#createInputSpectrogram(filename,filename)
		createInputSpectrogram(filename, 'inputSpectro')

#Whole pipeline .mp3 -> .png slices
def createSlicesFromInputAudio():
	print "Creating spectrograms..."
	createSpectrogramsFromInputAudio()
	print "Spectrograms created!"

	print "Creating slices..."
	createSlicesFromInputSpectrograms(desiredSize)
	print "Slices created!"