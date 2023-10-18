// We need to select using query selector or get element by id
// Then add event   listeners to text area
// finally convert  the input to html

const themeBtn= document.querySelector('.theme');
const textInput= document.querySelector('#text-input');
const markdown_preview= document.querySelector('#markdown-preview');
const sections= document.querySelectorAll('section')
const headings= document.querySelectorAll('.heading')

themeBtn.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    themeBtn.textContent= (document.body.classList.contains('dark')?'☀️':'🌙');
    themeBtn.classList.toggle('dark')
    sections[0].classList.toggle('dark')
    sections[1].classList.toggle('dark')
    headings[0].classList.toggle('dark')

    themeBtn.classList.toggle('dark')
})

textInput.addEventListener('input', (e)=>{
    let content= e.target.value;
    content= convert(content);
    markdown_preview.innerHTML= content;
})

function convert(content){
    let h1= /^#[^#].*$/gm;

    if (h1.test(content)) {
        const matches = content.match(h1) // returns array [] of all heading 1
      
        matches.forEach((element) => {
          const extractedText = element.slice(1)
          // each element is sliced from index 1
          // Example string : # Hi , then string will be ' Hi' because at index 1 is whitespace.
          content = content.replace(element, `<h1>${extractedText}</h1>`)
          // then replace the matched string with formatted HTML whose text content is extracted text.
          // finally reassign this replaced string.
        })
      }

      let h2= /^##[^#].*$/gm;

      if (h2.test(content)) {
        const matches = content.match(h2) // returns array [] of all heading 2
        matches.forEach((element) => {
          const extractedText = element.slice(2) // each element is sliced from index 2
          // Example string : ## Hi , then string will be ' Hi' because at index 2 is whitespace.
          content = content.replace(element, `<h2>${extractedText}</h2>`)
          // then replace the matched string with formatted HTML whose text content is extracted text.
          // finally reassign this replaced string.
        })
      }

      let bold= /\*\*[^\*\n]+\*\*/gm;

      if (bold.test(content)) {
        console.log(content);
        const matches = content.match(bold)
        matches.forEach((element) => {
          const extractedText = element.slice(2, -2) //sliced from index 2 till the (total length - 2)
          // Example : **abhik** , index 2 is a, so the new string is started from a
          // total length of string is 9  therefore 9 - 2 is 7. So the new string is from index 2 to 7 which is abhik
          content = content.replace(element, `<strong>${extractedText}</strong>`)
        })
      }

      let highlight= /==[^==\n]+==/gm;

      if (highlight.test(content)) {
        const matches = content.match(highlight)
        matches.forEach((element) => {
          const extractedText = element.slice(2, -2) //sliced from index 2 till the (total length - 2)
          // Example : ==abhik== , index 2 is a, so the new string is started from a
          // total length is 9  therefore 9 - 2 is 7. So the new string is from index 2 to 7 which is abhik
          content = content.replace(
            element,
            `<span class="highlight">${extractedText}</span>`,
            // we will add custom styles for highlight class in style.css
          )
        })
      }

      let italics= /[^\*]\*[^\*\n]+\*/gm

      if (italics.test(content)) {
        const matches = content.match(italics)
        matches.forEach((element) => {
          const extractedText = element.slice(2, -1)
          //sliced from index 2 till the (total length - 1)
          // Example : *abhik* , index 2 is a because the regex for italics says there should be 1 more character before star, so the new string is started from a
          // total length is 8  therefore 8 - 1  is 7. So the new string is from index 2 to 7 which is abhik
          content = content.replace(element, `<em>${extractedText}</em>`)
        })
      }

      let link= /\[[\w|\(|\)|\s|\*|\?|\-|\.|\,]*(\]\(){1}[^\)]*\)/gm

      if (link.test(content)) {
        const links = content.match(link)
        // ['[abhikb](https://www.youtube.com/c/abhikb)']
        links.forEach((element) => {
          const text = element.match(/^\[.*\]/)[0].slice(1, -1) // abhikb will be extracted
          const url = element.match(/\]\(.*\)/)[0].slice(2, -1)
          // https://www.youtube.com/c/abhikb will be extracted
          content = content.replace(element, `<a href="${url}">${text}</a>`)
        })
      }

      let lists= /^(\s*(\-|\d\.) [^\n]+)+$/gm

      if (lists.test(content)) {
        const matches = content.match(lists)
      
        matches.forEach((list) => {
          const listArray = list.split('\n')
          // ['- hi', '- bye', '', '1. hdhd', '2. jdjdj']
          const formattedList = listArray
            .map((currentValue, index, array) => {
              if (unorderedList.test(currentValue)) {
                currentValue = `<li>${currentValue.slice(2)}</li>`
      
                if (!unorderedList.test(array[index - 1])) {
                  //array[index-1] will be false if it is null,undefined or < 0
                  // unorderedList.test(array[index - 1]) will return true only if the the array element at index - 1 is ul element
                  // !unorderedList.test(array[index - 1]) will return true if the unorderedList.test(array[index - 1]) returns false
                  currentValue = '<ul>' + currentValue
                  // this means if the previous element of the list element in the array  is not a list element or this list element is the 1st element of the array  then add a starting ul tag
                }
                if (!unorderedList.test(array[index + 1])) {
                  //array[index+1] will be false if it is null,undefined or > length of the array
                  // unorderedList.test(array[index + 1]) will return true only if the the array element at index+1 is ul element
                  // !unorderedList.test(array[index + 1]) will return true if the unorderedList.test(array[index + 1]) returns false
                  currentValue = currentValue + '</ul>'
                  // this means if the next element of the list element in the array  is not a list element or this list element is the last element of the array  then append a closing ul tag
                }
              }
              //Similarly create ol
              if (orderedList.test(currentValue)) {
                currentValue = `<li>${currentValue.slice(2)}</li>`
      
                if (!orderedList.test(array[index - 1])) {
                  currentValue = '<ol>' + currentValue
                }
      
                if (!orderedList.test(array[index + 1])) {
                  currentValue = currentValue + '</ol>'
                }
              }
      
              return currentValue
            })
            .join('')
      
          content = content.replace(list, formattedList)
        })
      }

      content = content
                .split('\n')
                .map((line) => {
                    if (!line.startsWith('<') && line !== '') {
                    // if line is not empty & does not start with html tag
                    return line.replace(line, `<p>${line}</p>`)
                    } else {
                    return line
                    }
                })
                .join('\n')

    return content;
}