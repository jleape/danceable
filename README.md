# Danceable

An app to help you discover music that suits your dance style.

This app builds off of a Convolutional Neural Network designed to detect musical genres:

nihal223's github repo: https://github.com/nihal223/DeepAudioClassification/blob/master/README.md
which was forked from despoisj's repo. The original methodology is described here: [article on Medium](https://medium.com/@juliendespois/finding-the-genre-of-a-song-with-deep-learning-da8f59a61194#.yhemoyql0)

I modified nihal223's code to increase the sample size, label data based on dance-style directories instead of ID3 genre tags, and accommodate characters from foreign languages. I then built off of the model using a range of NPM packages to create a user-friendly application.

Download:

```
git clone 
```

Place the following file in the /CNN:
https://www.dropbox.com/s/c9g4uv27jzurbxc/musicDNN.tflearn.data-00000-of-00001?dl=0

Install:

```
npm install
```

Run:

```
npm run start
```

Use at localhost:8000

1. Select a dance style
2. View playlists for inspiration
3. Upload an mp3 file and click "Analyze MP3"
4. See the results:
* listen to your track
* view its spectrogram
* see its BPM and meta data
* see what the CNN model thinks you can dance to it
5. TAP to the beat while listening to set the BPM
6. Check the styles you think it suits
7. Fill in or edit the meta data
8. Submit your feedback and download your corrected MP3
