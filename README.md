## Pet Prediction

It happens more often than not - especially to animal & pet lovers such as myself - that you come across the most beautiful dog while going for a walk in the park -- or whenever you're mindlessly scrolling Facebook for hours.

This project is a digitalised manifestation of your gung ho pet breed connoisseur from around the corner. How? Through the means of **Machine Learning** (ML).

Nevertheless, to take into account the target audience and pragmatism of this implementation, I have chosen to pair the aforementioned notebook with a frontend developed in React in order to evade the convoluted process of having to manually import images into the model -- which is still an option if you're into self-loathing.

The dataset used in this project is the [Animal Breed - Cats and Dogs](https://www.kaggle.com/imsparsh/animal-breed-cats-and-dogs) dataset from Kaggle.

### Contents

- **app**: This contains the React project which makes the user experience a lot more intuitive and accessible as oppose to look at the Jupyter Notebook. It was was last updated on 23/03/2023.
- **models**: The collection of h5-exported tensorflow models which are used inside of the React app.
- **notebook.ipynb**: The notebook which contains the entire documentation of the creation of the exported model.

### Getting Started

#### Prerequisites

- Node.js v18 or later
- Python 3.0
- Tensorflow
- Jupyter Notebook

#### Installation

- Clone this repository: `git clone https://github.com/snenenenenenene/dnd-character-tool.git`
- Run the jupyter notebook with the data from [Animal Breed - Cats and Dogs](https://www.kaggle.com/imsparsh/animal-breed-cats-and-dogs) in the `/breeds` folder.
- Change into the directory: `cd ./pet-prediction`
- Install dependencies: `npm install`

#### Running the Application

- Change into the React app: `cd app`
- Start the development server: `npm run dev`
- Open the application in your browser at http://localhost:3000

### Data Source

This dataset was created using publicly available data from the Kaggle. The original data was obtained from [Animal Breed - Cats and Dogs](https://www.kaggle.com/imsparsh/animal-breed-cats-and-dogs)
