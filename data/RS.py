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

# Đánh giá mô hình
# Chọn những người dùng đọc các quyển sách xuất bản năm 2000
df_test = pd.merge(book_ratings_df, books_df, left_on='ISBN', right_on='ISBN')
User_reading = df_test[df_test['Year-Of-Publication'] == 2000]
User_reading = User_reading[["ISBN", "User-ID",
                             "Book-Rating", "Year-Of-Publication"]]
# Loại bỏ những quyển sách có đánh giá 0
User_reading = User_reading[User_reading['Book-Rating'] != 0]
# Loại bỏ quyển sách có ít hơn 30 người đọc
ISBN = User_reading['ISBN'].value_counts()
User_reading['num'] = [ISBN[val] for val in User_reading['ISBN'].values]
User_reading = User_reading[User_reading['num'] >= 30]
# Loại các người dùng đọc ít hơn 10 quyển sách
User_ID = User_reading['User-ID'].value_counts()
User_reading['num_read'] = [User_ID[val]
                            for val in User_reading['User-ID'].values]
User_reading = User_reading[User_reading['num_read'] >= 10]
ISBNs = User_reading['ISBN'].unique()
User_IDs = User_reading['User-ID'].unique()
# Kết quả thu được 6 người dùng và 69 quyển sách, đây là sẽ tập test
print(len(ISBNs), len(User_IDs))
Book_of_User = {}
for user in User_IDs:
    Book_of_User[user] = User_reading[User_reading['User-ID']
                                      == user]['ISBN'].values
# Ta sẽ tiến hành kiểm tra bằng cách lấy quyển sách của 1 người dùng trong tập test tiến hành gợi ý cho sản phẩm đó, nếu tập gợi ý có chứa ít nhất 1 quyển mà người dùng đó đã đọc nằm ngoài tập test thì xem là gợi ý đúng.
df.drop(User_IDs, axis=0, inplace=True)
# Tiến hành kiểm tra
total = 0
for user in User_IDs:
    List_Book = Book_of_User[user].tolist()
    recommend_right = []
    recommend_wrong = []
    for book in List_Book:
        recommend = recommend_book(book)
        recommend = recommend['ISBN'].values
        BOOKS = book_ratings_df[book_ratings_df['User-ID']
                                == 95359]['ISBN'].values
        for val in recommend:
            if val in BOOKS:
                recommend_right.append(val)
            else:
                recommend_wrong.append(val)
    recommend_right = list(dict.fromkeys(recommend_right))
    recommend_wrong = list(dict.fromkeys(recommend_wrong))
    total += len(recommend_right) / \
        (len(recommend_right) + len(recommend_wrong))

# Độ chính xác
print(total / len(User_IDs))
