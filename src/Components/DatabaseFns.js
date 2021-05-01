import db from "../firebase";
import firebase from "firebase";
const RetrieveData = (setBooks, setBooksAll) => {
  db.collection("books")
    // .where("bookGenre", "==", categ)
    .orderBy("timestamp", "asc")
    .onSnapshot((snapshot) => {
      setBooksAll(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          bookName: doc.data().bookName,
          author: doc.data().author,
          bookImage: doc.data().bookImage,
          bookDesc: doc.data().bookDesc,
          bookCopies: doc.data().bookCopies,
          bookGenre: doc.data().bookGenre,
        }))
      );
      setBooks(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          bookName: doc.data().bookName,
          author: doc.data().author,
          bookImage: doc.data().bookImage,
          bookDesc: doc.data().bookDesc,
          bookCopies: doc.data().bookCopies,
          bookGenre: doc.data().bookGenre,
        }))
      );
    });
};
// Thank you Codegrepper
//https://www.codegrepper.com/code-examples/whatever/firebase+get+document+by+id
const RetrieveABook = (setBook, id_received) => {
  db.collection("books")
    .doc(id_received)
    .get()
    .then((snapshot) => {
      setBook({
        id: id_received,
        bookName: snapshot.data().bookName,
        author: snapshot.data().author,
        bookImage: snapshot.data().bookImage,
        bookDesc: snapshot.data().bookDesc,
        bookCopies: snapshot.data().bookCopies,
        bookGenre: snapshot.data().bookGenre,
      });
      // console.log("here:" + JSON.stringify(snapshot.data()));
    });
};
const GetBookLenderInfo = (setBookLenderData) => {
  db.collection("BorrowedBooks")
    // .where("returnedAll", "==", true)
    // .orderBy("timestamp", "asc")
    .onSnapshot((snapshot) => {
      setBookLenderData(
        snapshot.docs.map((doc) => {
          // return JSON.stringify(doc.user);
          return {
            books: doc.data().books,
            user: doc.data().user,
          };
        })
      );
    });
};
const LogInfo = (
  clearAll,
  { bookName, author, bookImage, bookDesc, bookCopies, bookGenre }
) => {
  db.collection("books").add({
    bookName: bookName,
    author: author,
    bookImage: bookImage,
    bookDesc: bookDesc,
    bookCopies: bookCopies,
    bookGenre: bookGenre,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
  clearAll("Book was Saved to Database");
};
const LogBorrowedBookData = (recordToStore) => {
  db.collection("BorrowedBooks").add({
    ...recordToStore,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
const AddNewMemberDetails = (recordToStore) => {
  db.collection("MemberInfo").add({
    ...recordToStore,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
const updateBookCopiesInDB = (bid, n) => {
  db.collection("books").doc(bid).set({ bookCopies: n }, { merge: true });
};
const updateBookCopiesInDBBulk = (updatedBooks) => {
  updatedBooks.map((x) => {
    updateBookCopiesInDB(x.bid, x.n);
    // console.log("bookid:" + x.bid + " updated numcopies:" + x.n);
  });
};

export {
  RetrieveData,
  RetrieveABook,
  LogInfo,
  LogBorrowedBookData,
  updateBookCopiesInDBBulk,
  AddNewMemberDetails,
  GetBookLenderInfo,
};
