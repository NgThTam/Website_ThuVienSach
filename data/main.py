import chardet
import pandas as pd

# file = './BX-Books.csv'
# with open(file, 'rb') as rawdata:
#     result = chardet.detect(rawdata.read(100000))
# print(result)

df = pd.read_csv('./BX-Books.csv', encoding='ISO-8859-1',
                 index_col=False, low_memory=False)

print(df.head(5))
