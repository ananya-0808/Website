function generate(){
  var quotes = {
    "- Albert Einstein" : "Two things are infinite: the universe and human stupidity; and I am not sure about the universe.",
    "- Marcus Tullius Cicero" : "A room without books is like a body without a soul.",
    "- Bernard M. Baruch" : "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
    "- Oscar Wilde" : "Always forgive your enemies; nothing annoys them so much.",
    "- Andre Gide" : "It is better to be hated for what you are than to be loved for what you are not.",
    "- Marilyn Monroe" : "Imperfection is beauty, madness is genius.",
    "- Mark Twain" : "Good friends, good books, and a sleepy conscience: this is the ideal life.",
    "- Maurice Switzer" : "It is better to remain silent at the risk of being thought a fool, than to talk and remove all doubt of it.",
    "- Dr Seuss" : "I like nonsense, it wakes up the brain cells. Fantasy is a necessary ingredient in living.",
    "- Steve Martin" : "A day without sunshine is like, you know, night.",
    "- Oscar Wilde" : "If one cannot enjoy reading a book over and over again, there is no use in reading it at all.",
    "- Abraham Lincoln" : "Folks are usually about as happy as they make their minds up to be.",
    "- Theodore Roosevelt" : "Do what you can, with what you have, where you are.",
    "- Bob Marley" : "One good thing about music, when it hits you, you feel no pain.",
    "- Gruocho Marx" : "I find television very educating. Every time somebody turns on the set, I go into the other room and read a book.",
    "- Alexandre Dumas-fils" : "The difference between genius and stupidity is: genius has its limits.",
    "- John Lennon" : "You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us. And the world will live as one.",
    "- C.S. Lewis" : "Some day you will be old enough to start reading fairy tales again.",
    "- Mark Twain" : "A lie can travel half way around the world while the truth is putting on its shoes.",
    "- Markus Herz" : "Be careful about reading health books. Some fine day you'll die of a misprint.",
    "- Mae West" : "You only live once, but if you do it right, once is enough.",
    "- Terry Pratchett": "The trouble with having an open mind, of course, is that people will insist on coming along and trying to put things in it.",
    "- John Green" : "Some infinities are bigger than other infinities.",
    "- Marthe Troly-Curtin" : "Time you enjoy wasting is not wasted time.",
    "- Paulo Coelho" : "And, when you want something, all the universe conspires in helping you to achieve it.",
    "- Socrates" : "The only true wisdom is in knowing you know nothing.",
    "- Nicholas Chamfort" : "A day without laughter is a day wasted."
  }
  var authors = Object.keys(quotes);
  var author = authors[Math.floor(Math.random()*authors.length)];
  var quote = quotes[author];
  document.getElementById("quote").innerHTML = quote;
  document.getElementById("author").innerHTML = author;
  }
