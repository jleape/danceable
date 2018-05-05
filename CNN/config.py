#Define paths for files
homeDir = "./"
spectrogramsInputPath = homeDir + "Input/InputSpectrograms/"
spectrogramsPath = homeDir + "Data/Spectrograms/"
slicesPath = homeDir + "Data/Slices/"
slicesInputPath = homeDir + "Input/Slices/"
datasetPath = homeDir + "Data/Dataset/"
inputDatasetPath = homeDir + "Input/Dataset/"
rawDataPath = homeDir + "Data/Raw/"
inputDataPath = homeDir + "Input/Raw/"

#Spectrogram resolution
pixelPerSecond = 50

#Slice parameters
sliceSize = 128

#Dataset parameters
filesPerGenre = 5000
validationRatio = 0.3
testRatio = 0.1

#Model parameters
batchSize = 128
learningRate = 0.001
nbEpoch = 20