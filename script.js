




const createElement = (arr) => {

    const htmlElements = arr.map(el => `<span class="btn">${el}</span>`)
    return (htmlElements.join(" "));
}



function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}



const manegSpiner = (status) => {
    if(status==true){
      document.getElementById("spainner").classList.remove("hidden");  
      document.getElementById("word-container").classList.add("hidden");  
    }else{
        document.getElementById("word-container").classList.remove("hidden");  
              document.getElementById("spainner").classList.add("hidden");  
    }
}


const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then((json) => displayLesson(json.data));
}

    const removeActive = () => {
        const lessonButtons = document.querySelectorAll(".lesson-btn")
        lessonButtons.forEach(btn=> btn.classList.remove("active"));
    }


const loadevelword =(id)=>{
    manegSpiner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(res => res.json())
    .then((data) => {
        removeActive(); //remove all active class
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        
        clickBtn.classList.add("active") //add active class add
        displyLevelWord(data.data)});
    
}

    const loadwordDetail=async (id)=>{
        const url = `https://openapi.programming-hero.com/api/word/${id}`
       
        const res = await fetch(url);
        const details = await res.json();
        displayWordDetails(details.data);
    
    }


    //         {
    // "word": "Eager",
    // "meaning": "আগ্রহী",
    // "pronunciation": "ইগার",
    // "level": 1,
    // "sentence": "The kids were eager to open their gifts.",
    // "points": 1,
    // "partsOfSpeech": "adjective",
    // "synonyms": [
    //     "enthusiastic",
    //     "excited",
    //     "keen"
    // ],
    // "id": 5





    const displayWordDetails = (word) => {
        console.log(word);
        const detailsBox = document.getElementById("details-container");
        detailsBox.innerHTML=`

                      <div class="">
            <h2 class="text-2xl font-bold"> ${word.word} ( <i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold">synonym</h2>
            <div class="">${createElement(word.synonyms)}</div>
          </div>

        `
        document.getElementById("word_modal").showModal();
    }

const displyLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML="";

    if(words.length == 0){
       wordContainer.innerHTML=`
      <div class="text-center col-span-full rounded-xl py-10 space-y-6 ">
        
        <img class = "mx-auto" src="./assets/alert-error.png" alt="">
      <p class="text-xl font-medium  font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="font-bold text-4xl font-bangla">নেক্সট Lesson এ যান</h2>
      </div>
       `;
         manegSpiner(false);
         return ;

    }
    

//     {
//     "id": 83,
//     "level": 1,
//     "word": "Door",
//     "meaning": "দরজা",
//     "pronunciation": "ডোর"
// }



    words.forEach(word => {
        console.log(word);
        const card = document.createElement('div');
        card.innerHTML = `
          <div class="bg-white rounded-xl shadow-sm text-center py-20 px-5 space-y-4">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যাই নাই"}</h2>
            <p class="font-semibold ">Meaning /Pronounciation</p>
            <div class="fonnt-bangla text-2xl font-medium"> "${word.meaning ? word.meaning: "অর্থ পাওয়া য়াইনি "} / ${word.pronunciation ? word.pronunciation: "pronunciation পাওয়া য়াইনি" } "</div>
            <div class="flex justify-between items-center">
                <button onclick="loadwordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.appendChild(card);

    });
        manegSpiner(false);

}


    const displayLesson = (lessons) => {
    // 1.get the container & empty
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML=""
    // 2. get into every Lesson
    for(let lesson of lessons){
    // 3. create Element
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML=`
                 <button id="lesson-btn-${lesson.level_no}" onclick="loadevelword(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"> 
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                 </button>
    
    `
    levelContainer.appendChild(btnDiv);
}


// 4. append into container 



}
loadLesson();


document.getElementById("btn-search").addEventListener('click',()=>{
    removeActive();
   const input = document.getElementById("input-search");
   const searchValue = input.value.trim().toLowerCase();
   console.log(searchValue);

   fetch("https://openapi.programming-hero.com/api/words/all")
   .then((res) => res.json())
   .then((data) => {
    const allWords = data.data;
    console.log(allWords);
    const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));

    displyLevelWord(filterWords);
   })
})