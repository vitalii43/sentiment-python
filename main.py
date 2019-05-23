from word_features import extract
import json
import pickle
import sys

try:
    f = open('C:\LEARNING\sentimen-nltk\classifier.pickle', 'rb')
except FileNotFoundError:
    print('Classifier not found')
    exit()

classifier = pickle.load(f)
f.close()

try:
    features = extract(sys.argv[1])
except IndexError:
    print('No text supplied to classify')

#print(classifier.classify(features))
res = []
for item in sys.argv[1:]:
    review = extract(item)
    res.append(classifier.classify(review))
print(json.dumps(res))