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

const GetEntireBookReturnTable = (setBookReturns) => {
  db.collection("UserBookReturnTable").onSnapshot((snapshot) =>
    setBookReturns(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        books: doc.data().books,
        user: doc.data().user,
      }))
    )
  );
};

const ApproveReturns = (id, checkoutID, uBRTid, n) => {
  //first change BorrowedBooks collection
  db.collection("BorrowedBooks")
    .doc(checkoutID)
    .get()
    .then((snapshot) => {
      let books = snapshot.data().books;
      let returnedAll = true;
      books = books.map((x, ind) => {
        if (x.id == id) x.n_returned = x.n_returned + n;
        if (x.n != x.n_returned) returnedAll = false;
        return x;
      });
      db.collection("BorrowedBooks")
        .doc(checkoutID)
        .set({ books: books, returnedAll: returnedAll }, { merge: true });
    });
  //then change UserBookReturnTable
  db.collection("UserBookReturnTable")
    .doc(uBRTid)
    .get()
    .then((snapshot) => {
      let books = snapshot.data().books;
      books = books.map((x, ind) => {
        if (x.id == id && x.checkoutID == checkoutID) x.n = x.n - n;
        return x;
      });
      books = books.filter((x) => x.n != 0);
      if (books.length == 0) {
        db.collection("UserBookReturnTable").doc(uBRTid).delete();
      } else
        db.collection("UserBookReturnTable")
          .doc(uBRTid)
          .set({ books: books }, { merge: true });
    });
  //finally add back returned books to the books table
  db.collection("books")
    .doc(id)
    .get()
    .then((snapshot) => {
      let bookCopies = snapshot.data().bookCopies;
      bookCopies += n;
      db.collection("books")
        .doc(id)
        .set({ bookCopies: bookCopies }, { merge: true });
    });
};
const GetBookLenderInfo = (setBookLenderData) => {
  try {
    db.collection("BorrowedBooks")
      .where("returnedAll", "==", false)
      // .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setBookLenderData(
          snapshot.docs.map((doc) => {
            // return JSON.stringify(doc.user);
            return {
              books: doc.data().books,
              user: doc.data().user,
              returnedAll: doc.data().returnedAll,
              timestamp: convertTStampToDate(doc.data().timestamp.seconds),
            };
          })
        );
      });
  } catch (err) {
    console.log(err);
  }
};

const GetDataFromUserBookReturnTable = (
  useremail,
  id,
  checkoutID,
  setNumBooksForReturn
) => {
  db.collection("UserBookReturnTable")
    .where("user", "==", useremail)
    .onSnapshot((snapshot) => {
      if (snapshot.size == 0) setNumBooksForReturn(0);
      else {
        let books = snapshot.docs[0]
          .data()
          .books.filter((x) => x.id == id && x.checkoutID == checkoutID);
        if (books.length == 0) setNumBooksForReturn(0);
        else setNumBooksForReturn(books[0].n);
      }
    });
};

const GetArrayOfBooksFromUserBookReturnTable = (
  useremail,
  setBooksArrayForReturn,
  setIdinBookReturnTable
) => {
  db.collection("UserBookReturnTable")
    .where("user", "==", useremail)
    .onSnapshot((snapshot) => {
      if (snapshot.size == 0) setBooksArrayForReturn([]);
      else {
        setBooksArrayForReturn(snapshot.docs[0].data().books);
        setIdinBookReturnTable(snapshot.docs[0].id);
      }
    });
};

const LogUserBookReturnData = (record, editData, idtostore = -1) => {
  if (!editData) {
    console.log("storing data");
    db.collection("UserBookReturnTable").add({
      ...record,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } else {
    console.log("editing");
    db.collection("UserBookReturnTable")
      .doc(idtostore)
      .set({ books: record.books }, { merge: true });
  }
};

const GetBookLenderInfoSingleUser = (setBookLenderData, user) => {
  try {
    let query = db.collection("BorrowedBooks");
    query = query.where("returnedAll", "==", false);
    query = query.where("user", "==", user);

    query.onSnapshot((snapshot) => {
      setBookLenderData(
        snapshot.docs.map((doc) => {
          // return JSON.stringify(doc.user);
          if (doc.data().timestamp)
            return {
              checkoutID: doc.id,
              books: doc.data().books,
              user: doc.data().user,
              returnedAll: doc.data().returnedAll,
              timestamp: convertTStampToDate(doc.data().timestamp.seconds),
            };
        })
      );
    });
  } catch (err) {
    alert(err);
  }
};

const convertTStampToDate = (ts) => {
  let tStamp = new Date(ts * 1000).toLocaleDateString();
  tStamp = [
    tStamp.split("/")[1],
    tStamp.split("/")[0],
    tStamp.split("/")[2],
  ].join("-");
  return tStamp;
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
const addMsgToDB = (msg, user, bookId) => {
  db.collection("forumMessages").add({
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    msgContent: msg,
    user: user,
    bookId: bookId,
  });
};
const getAllForumMessages = (setMessages, idx) => {
  let query = db.collection("forumMessages");
  if (!idx) idx = "123";
  query = query.where("bookId", "==", idx);
  query = query.orderBy("timestamp", "desc");
  query.onSnapshot((snapshot) =>
    setMessages(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        message: doc.data().msgContent,
        username: doc.data().user,
        bookId: doc.data().bookId,
        timestamp: doc.data().timestamp,
      }))
    )
  );
};

export {
  RetrieveData,
  RetrieveABook,
  LogInfo,
  LogBorrowedBookData,
  updateBookCopiesInDBBulk,
  AddNewMemberDetails,
  GetBookLenderInfo,
  GetBookLenderInfoSingleUser,
  GetDataFromUserBookReturnTable,
  LogUserBookReturnData,
  GetArrayOfBooksFromUserBookReturnTable,
  GetEntireBookReturnTable,
  ApproveReturns,
  addMsgToDB,
  getAllForumMessages,
};
