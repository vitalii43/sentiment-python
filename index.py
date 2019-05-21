
from word_features import extract
from nltk.classify import NaiveBayesClassifier
from nltk.corpus import movie_reviews


import pickle
import nltk.classify.util


""" 
Only downloads the movie reviews database
if haven't done so previously 
"""
try:
    negative_ids = movie_reviews.fileids('neg')
    positive_ids = movie_reviews.fileids('pos')
except LookupError:
    import nltk
    nltk.download('movie_reviews')
    negative_ids = movie_reviews.fileids('neg')
    positive_ids = movie_reviews.fileids('pos')

""" 
Separate positive features from negative
"""
negative_features = [(extract(movie_reviews.words(fileids=[f])), 'neg') for f in negative_ids]
positive_features = [(extract(movie_reviews.words(fileids=[f])), 'pos') for f in positive_ids]

""" 
Trains of 3/4 off the database
and test off 1/4
"""
negative_cutoff = int(len(negative_features) * 3 / 4)
positive_cutoff = int(len(positive_features) * 3 / 4)

train_features = negative_features[:negative_cutoff] + positive_features[:positive_cutoff]
test_features = negative_features[negative_cutoff:] + positive_features[positive_cutoff:]

print('Training on %d instances, testing on %d instances' % (len(train_features), len(test_features)))
classifier = NaiveBayesClassifier.train(train_features)
print('Training complete')
print('accuracy:', nltk.classify.util.accuracy(classifier, test_features))
classifier.show_most_informative_features()

""" Save classifier """
f = open('classifier.pickle', 'wb')
pickle.dump(classifier, f)
f.close()