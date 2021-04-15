const root = document.getElementById('root');

const handleSelectJob = async (id) => {
  const res = await fetch(
    `https://cors.bridged.cc/https://jobs.github.com/positions/${id}.json`
  );
  const data = await res.json();
  const detalis = jobDetails(data);
  root.innerHTML = detalis;
  console.log(data);
};

const fetchData = async () => {
  const res = await fetch(
    'https://cors.bridged.cc/https://jobs.github.com/positions.json'
  );
  const data = await res.json();
  return data;
};

const JobCard = (job) => {
  const card = document.createElement('div');
  card.id = job.id;
  card.innerHTML = `
   <p>${job.type}</p>
   <h3>${job.title}</h3>
   <p>${job.company}</p>
   <p>${job.location}</p>
   `;

  return card;
};

const jobDetails = (job) => {
  const details = `
     <h3>${job.company}</h3>
     <a href="${job.company_url}">Company</a>
     <p>${job.type}</p>
     <h2>${job.title}</h2>
     <p>${job.location}</p>
     <div>${job.description}}</div>
     <h4>How to Apply</h4>
     <div>${job.how_to_apply}</div>
     <div>
      <h3>${job.title}</h3>
      <p>${job.company}</p>
     </div>
   `;
  return details;
};

const renderJobs = async () => {
  const jobs = await fetchData();

  jobs.forEach((job) => {
    const card = JobCard(job);
    root.append(card);
    card.addEventListener('click', () => {
      handleSelectJob(card.id);
    });
  });
};

renderJobs();
