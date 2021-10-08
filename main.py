#Imports
import numpy as np
import pandas as pd
import os
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.python.keras.preprocessing.image import ImageDataGenerator
from sklearn.metrics import classification_report, log_loss, accuracy_score
from sklearn.model_selection import train_test_split

directory = 'breeds/TRAIN'
directory2 = 'breeds/TEST'
Name=[]
for file in os.listdir(directory):
    Name+=[file]
print(Name)
print(len(Name))
['basset_hound', 'beagle', 'russian_blue', 'pomeranian', 'ragdoll', 'staffordshire_bull_terrier', 'keeshond', 'siamese', 'pug', 'shiba_inu', 'american_pit_bull_terrier', 'bengal', 'british_shorthair', 'newfoundland', 'havanese', 'japanese_chin', 'german_shorthaired', 'birman', 'maine_coon', 'english_cocker_spaniel', 'scottish_terrier', 'wheaten_terrier', 'chihuahua', 'american_bulldog', 'abyssinian', 'boxer', 'yorkshire_terrier', 'miniature_pinscher', 'sphynx', 'samoyed', 'leonberger', 'bombay', 'english_setter', 'persian', 'great_pyrenees', 'egyptian_mau', 'saint_bernard']
37
mapping={ 'basset_hound':0, 'beagle':1, 'russian_blue':2, 'pomeranian':3, 'ragdoll':4, 
         'staffordshire_bull_terrier':5, 'keeshond':6, 'siamese':7, 'pug':8, 'shiba_inu':9, 
         'american_pit_bull_terrier':10, 'bengal':11, 'british_shorthair':12, 'newfoundland':13, 
         'havanese':14, 'japanese_chin':15, 'german_shorthaired':16, 'birman':17, 'maine_coon':18, 
         'english_cocker_spaniel':19, 'scottish_terrier':20, 'wheaten_terrier':21, 'chihuahua':22, 
         'american_bulldog':23, 'abyssinian':24, 'boxer':25, 'yorkshire_terrier':26, 'miniature_pinscher':27, 
         'sphynx':28, 'samoyed':29, 'leonberger':30, 'bombay':31, 'english_setter':32, 'persian':33, 
         'great_pyrenees':34, 'egyptian_mau':35, 'saint_bernard':36 }
dataset=[]
count=0

for file in os.listdir(directory):
    path=os.path.join(directory,file)
    for im in os.listdir(path):
        image=load_img(os.path.join(path,im), grayscale=False, color_mode='rgb', target_size=(180,180))
        image=img_to_array(image)
        image=image/255.0
        dataset.append([image,count])     
    count=count+1
test=[]
testfile=[]

for file in os.listdir(directory2):
    path=os.path.join(directory2,file)
    image=load_img(path, grayscale=False, color_mode='rgb', target_size=(180,180))
    image=img_to_array(image)
    image=image/255.0
    test+=[image]
    testfile+=[file]
data,labels0=zip(*dataset)
labels1=to_categorical(labels0)
labels=np.array(labels1)
data=np.array(data)
test=np.array(test)
data2=data.reshape(-1,180,180,3)
test2=test.reshape(-1,180,180,3)
trainx,testx,trainy,testy=train_test_split(data,labels,test_size=0.2,random_state=44)
print(trainx.shape)
print(testx.shape)
print(trainy.shape)
print(testy.shape)

datagen = ImageDataGenerator(horizontal_flip=True,vertical_flip=True,rotation_range=20,zoom_range=0.2,
                        width_shift_range=0.2,height_shift_range=0.2,shear_range=0.1,fill_mode="nearest")
pretrained_model3 = tf.keras.applications.DenseNet121(input_shape=(180,180,3),include_top=False,weights='imagenet',pooling='avg')
pretrained_model3.trainable = False

inputs3 = pretrained_model3.input
x3 = tf.keras.layers.Dense(128, activation='relu')(pretrained_model3.output)
outputs3 = tf.keras.layers.Dense(37, activation='softmax')(x3)
model = tf.keras.Model(inputs=inputs3, outputs=outputs3)

model.compile(optimizer='adam',loss='categorical_crossentropy',metrics=['accuracy'])

his=model.fit(datagen.flow(trainx,trainy,batch_size=32),validation_data=(testx,testy),epochs=30)

y_pred=model.predict(testx)
pred=np.argmax(y_pred,axis=1)
ground = np.argmax(testy,axis=1)
print(classification_report(ground,pred))

get_acc = his.history['accuracy']
value_acc = his.history['val_accuracy']
get_loss = his.history['loss']
validation_loss = his.history['val_loss']

epochs = range(len(get_acc))
plt.plot(epochs, get_acc, 'r', label='Accuracy of Training data')
plt.plot(epochs, value_acc, 'b', label='Accuracy of Validation data')
plt.title('Training vs validation accuracy')
plt.legend(loc=0)
plt.figure()
plt.show()

epochs = range(len(get_loss))
plt.plot(epochs, get_loss, 'r', label='Loss of Training data')
plt.plot(epochs, validation_loss, 'b', label='Loss of Validation data')
plt.title('Training vs validation loss')
plt.legend(loc=0)
plt.figure()
plt.show()

load_img("breeds/TEST/1006.jpg",target_size=(180,180))

image=load_img("breeds/TEST/1006.jpg",target_size=(180,180))

image=img_to_array(image) 
image=image/255.0
prediction_image=np.array(image)
prediction_image= np.expand_dims(image, axis=0)

reverse_mapping={  0:'basset_hound', 1:'beagle', 2:'russian_blue', 3:'pomeranian', 4:'ragdoll', 
         5:'staffordshire_bull_terrier', 6:'keeshond', 7:'siamese', 8:'pug', 9:'shiba_inu', 
         10:'american_pit_bull_terrier', 11:'bengal', 12:'british_shorthair', 13:'newfoundland', 
         14:'havanese', 15:'japanese_chin', 16:'german_shorthaired', 17:'birman', 18:'maine_coon', 
         19:'english_cocker_spaniel', 20:'scottish_terrier', 21:'wheaten_terrier', 22:'chihuahua', 
         23:'american_bulldog', 24:'abyssinian', 25:'boxer', 26:'yorkshire_terrier', 27:'miniature_pinscher', 
         28:'sphynx', 29:'samoyed', 30:'leonberger', 31:'bombay', 32:'english_setter', 33:'persian', 
         34:'great_pyrenees', 35:'egyptian_mau', 36:'saint_bernard' } 

def mapper(value):
    return reverse_mapping[value]

prediction=model.predict(prediction_image)
value=np.argmax(prediction)
move_name=mapper(value)
print("Prediction is {}.".format(move_name))

print(test.shape)
prediction2=model.predict(test)
print(prediction2.shape)

pred2=[]
for item in prediction2:
    value2=np.argmax(item)      
    move_name2=mapper(value2)
    pred2+=[move_name2]

model.save('models/model1.h5')