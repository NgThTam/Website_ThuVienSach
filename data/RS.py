import pandas as pd

book_ratings_df = pd.read_csv(
    'BX-Book-Ratings.csv', sep=';', encoding='CP1252', escapechar='\\')
books_df = pd.read_csv('BX-Books.csv', sep=';',
                       encoding='CP1252', escapechar='\\')
users_df = pd.read_csv('BX-Users.csv', sep=';',
                       encoding='CP1252', escapechar='\\')

df = pd.merge(book_ratings_df, books_df, left_on='ISBN', right_on='ISBN')
df = df[df.columns[0:6]]
# Loại bỏ các đánh giá bằng 0
df = df[df['Book-Rating'] != 0]
# Loại bỏ các quyển sách có ít hơn 10 người đọc
data = df['ISBN'].value_counts()
df_temp = pd.DataFrame()
df_temp['ISBN'] = data.index
df_temp['num'] = data.values
df_temp = df_temp[df_temp['num'] >= 10]
df = pd.merge(df_temp, df[df['Book-Rating'] != 0],
              left_on='ISBN', right_on='ISBN')
df = df.pivot_table(index="User-ID", columns="ISBN", values="Book-Rating")
# print(df.head())


def corr_book(id_book):
    book_like = df.corrwith(df[id_book], method='pearson')
    corr = pd.DataFrame(book_like, columns=['Correlation'])
    corr.dropna(inplace=True)
    return corr


def recommend_book(id_book):
    corr = corr_book(id_book)
    corr.sort_values('Correlation', ascending=False, inplace=True)
    ids = corr[corr['Correlation'] >= 0.8].head(5)
    res = pd.DataFrame()
    res['ISBN'] = ids.index.values
    res = pd.merge(res, books_df, left_on="ISBN", right_on="ISBN")
    return res['ISBN'].tolist()


print(recommend_book('0060096195'))

# lấy dữ liệu gợi ý
# reco = pd.DataFrame()
# reco['ISBN'] = df.columns
# reco['recomend'] = reco['ISBN'].apply(recommend_book)
# reco.to_json("RS.json", orient = "records", date_format = "epoch", double_precision = 10, force_ascii = True, date_unit = "ms", default_handler = None)
