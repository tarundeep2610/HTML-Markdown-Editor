Link: https://html-markdown-editor.onrender.com;

Markdown Syntax for the following formats are:
headings 1 & 2 : # H1,## H2,

bold : **bold text** ,

italics : _italicized text_ ,

highlight : ==highlighted text==,

lists (unordered & ordered)

unordered :

- First item
- Second item
  ordered :

1. First item
2. Second item
   hyperlinks : [title](https://www.example.com)

For detecting those syntaxes we will use regex (short for regular expression). A regex is a string of text that lets you create patterns that help match, locate, and manage text.

In Javascript, we normally test a regex pattern like this : /abhik/g.test('my name is abhik'). Here /abhik/ is the regex pattern. .test() method tests for a match in a string. It returns true or false based on pattern matched or not. We will also use match() method which returns an array containing all of the matches, including capturing groups, or null if no match is found.
