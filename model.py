#Imports
import numpy as np
from PIL import Image
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import os

#Load image
# image=load_img("breeds/TEST/1497.jpg",target_size=(180,180))
image=load_img("breeds/TEST/1002.jpg",target_size=(180,180))

#Import saved keras model generated and saved by main.py
model = keras.models.load_model('models/model1.h5')

#Show user image to verify pet
image.show()

#Parse image into array for machine learning purposes
image=img_to_array(image) 
image=image/255.0
prediction_image=np.array(image)
prediction_image= np.expand_dims(image, axis=0)

#Map number value back to breed name based on (reverse) mapping created in main.py
# reverse_mapping={  0:'basset_hound', 1:'beagle', 2:'russian_blue', 3:'pomeranian', 4:'ragdoll', 
#          5:'staffordshire_bull_terrier', 6:'keeshond', 7:'siamese', 8:'pug', 9:'shiba_inu', 
#          10:'american_pit_bull_terrier', 11:'bengal', 12:'british_shorthair', 13:'newfoundland', 
#          14:'havanese', 15:'japanese_chin', 16:'german_shorthaired', 17:'birman', 18:'maine_coon', 
#          19:'english_cocker_spaniel', 20:'scottish_terrier', 21:'wheaten_terrier', 22:'chihuahua', 
#          23:'american_bulldog', 24:'abyssinian', 25:'boxer', 26:'yorkshire_terrier', 27:'miniature_pinscher', 
#          28:'sphynx', 29:'samoyed', 30:'leonberger', 31:'bombay', 32:'english_setter', 33:'persian', 
#          34:'great_pyrenees', 35:'egyptian_mau', 36:'saint_bernard' } 
reverse_mapping={
    0: "abyssinian",
    1: "american_bulldog",
    2: "american_pit_bull_terrier",
    3: "basset_hound",
    4: "beagle",
    5: "bengal",
    6: "birman",
    7: "bombay",
    8: "boxer",
    9: "british_shorthair",
    10: "chihuahua",
    11: "egyptian_mau",
    12: "english_cocker_spaniel",
    13: "english_setter",
    14: "german_shorthaired",
    15: "great_pyrenees",
    16: "havanese",
    17: "japanese_chin",
    18: "keeshond",
    19: "leonberger",
    20: "maine_coon",
    21: "miniature_pinscher",
    22: "newfoundland",
    23: "persian",
    24: "pomeranian",
    25: "pug",
    26: "ragdoll",
    27: "russian_blue",
    28: "saint_bernard",
    29: "samoyed",
    30: "scottish_terrier",
    31: "shiba_inu",
    32: "siamese",
    33: "sphynx",
    34: "staffordshire_bull_terrier",
    35: "wheaten_terrier",
    36: "yorkshire_terrier",
  }

def mapper(value):
    return reverse_mapping[value]

# PREDICTION

#Use prediction to get best match stored in value var
print(prediction_image)
prediction=model.predict(prediction_image)
value=np.argmax(prediction)
move_name=mapper(value)
print(f"Prediction is {format(move_name).capitalize()}.")