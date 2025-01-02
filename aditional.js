document.getElementById('studyForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const subject = document.getElementById('subject').value.toLowerCase();
  const resultsDiv = document.getElementById('results');

  if (!subject) {
      resultsDiv.innerHTML = '<p>Please select a subject.</p>';
      return;
  }

  // Example link generation based on subject
  const links = generateLinks(subject);
  
  if (links.length === 0) {
      resultsDiv.innerHTML = '<p>No resources found for this subject.</p>';
      return;
  }

  resultsDiv.innerHTML = links.map(link => `<a href="${link.url}" target="_blank">${link.text}</a>`).join('');
});

function generateLinks(subject) {
  const resources = {
      math: [
          { text: 'Khan Academy Math', url: 'https://www.khanacademy.org/math' },
          { text: 'Wolfram Alpha', url: 'https://www.wolframalpha.com/' }
      ],
      chemistry: [
          { text: 'NASA for Students', url: 'https://www.nasa.gov/education' },
          { text: 'Khan Academy Science', url: 'https://www.khanacademy.org/science' }
      ],
      history: [
          {text: 'History Channel', url: 'https://www.history.com/' },
          {text: 'Khan Academy History', url: 'https://www.khanacademy.org/humanities' },
          {text:'BBC History' ,url:'https://www.bbc.com/reel/topic/history'},
          {text:'CrashCourse - History', url:'https://www.youtube.com/@crashcourse/featured'},
          {text:'Digital Inquiry Group', url:'https://inquirygroup.org/'},

      ],
      biology: [
        {text: 'Utah Genetics', url:'https://learn.genetics.utah.edu/'},
        {text: 'HHMI', url:'https://www.biointeractive.org/'},
        {text:'The Concord Consortium', url:'https://concord.org/'},
        {text: 'Bioman', url:'https://www.biomanbio.com/'},
        {text:'CK-12 Biology', url:'https://www.ck12.org/book/ck-12-biology/'},
        {text:'CliffNotes Biology', url:'https://www.cliffsnotes.com/study-guides/biology/biology'},
        {text:'Amobea Sisters', url:'https://www.youtube.com/c/AmoebaSisters'},
        {text:'Kurzgesagt - In a Nutshell', url:'https://www.youtube.com/c/inanutshell'},
        {text:'CrashCourse - Biology', url:'https://www.youtube.com/@crashcourse/featured'}
      ]
  };

  return resources[subject] || [];
}
