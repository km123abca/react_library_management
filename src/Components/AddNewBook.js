import React, { useState } from "react";
import {
  Button,
  Alert,
  Breadcrumb,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Homepage from "./Homepage";
import { LogInfo } from "./DatabaseFns";
function AddNewBook() {
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookImage, setBookImage] = useState("");
  const [bookDesc, setBookDesc] = useState("");
  const [bookCopies, setBookCopies] = useState("");
  const [bookGenre, setBookGenre] = useState("Others");
  const submitBook = (e) => {
    e.preventDefault();
    LogInfo(clearAll, {
      bookName: bookName,
      author: author,
      bookImage: "/bookimages/" + bookGenre + "/" + bookImage,
      bookDesc: bookDesc == "" ? "No Description for this book" : bookDesc,
      bookCopies: bookCopies,
      bookGenre: bookGenre,
    });
  };
  const clearAll = (msg) => {
    setBookName("");
    setAuthor("");
    setBookImage("");
    setBookDesc("");
    setBookCopies("");
    setBookGenre("Others");
    alert(msg);
  };
  return (
    <div>
      <Homepage />
      <Form className="col-12" style={{ marginTop: "90px" }}>
        <div className="col-12 row">
          <Form.Group className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
            <Form.Label className="font-weight-bold">*Book Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type Book Name Here"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
            <Form.Text className="text-muted">let</Form.Text>
          </Form.Group>
          <Form.Group className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
            <Form.Label className="font-weight-bold">*Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Type Author Name Here"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <Form.Text className="text-muted">the</Form.Text>
          </Form.Group>
          <Form.Group className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
            <Form.Label className="font-weight-bold">
              Book Description
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe the book"
              value={bookDesc}
              onChange={(e) => setBookDesc(e.target.value)}
            />
            <Form.Text className="text-muted">sun</Form.Text>
          </Form.Group>
          <Form.Group className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
            <Form.Label className="font-weight-bold">Book Genre</Form.Label>
            <Form.Control
              as="select"
              placeholder="Select Genre"
              value={bookDesc}
              onChange={(e) => setBookGenre(e.target.value)}
            >
              <option value="Others">Choose a Genre</option>
              <option value="Thriller">Thriller</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Horror">Horror</option>
              <option value="Children's book">Children's book</option>
              <option value="Comedy">Comedy</option>
            </Form.Control>
            <Form.Text className="text-muted">shine on this</Form.Text>
          </Form.Group>
          <Form.Group className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
            <Form.Label className="font-weight-bold">
              *Number of copies
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Copies in stock"
              value={bookCopies}
              onChange={(e) => setBookCopies(e.target.value)}
            />
            <Form.Text className="text-muted">lord</Form.Text>
          </Form.Group>
          <Form.Group className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
            <Form.Label className="font-weight-bold">
              *Book Image File Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="hobbit.jpg ring.png etc"
              value={bookImage}
              onChange={(e) => setBookImage(e.target.value)}
            />
            <Form.Text className="text-muted">of cinder</Form.Text>
          </Form.Group>
        </div>
        <Button
          variant="primary"
          type="submit"
          className="mx-auto"
          disabled={!(bookName && author && bookCopies && bookImage)}
          onClick={submitBook}
        >
          Submit for approval
        </Button>
      </Form>
    </div>
  );
}

export default AddNewBook;
