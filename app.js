const content = document.getElementById('content');
const jobsList = document.getElementById('jobsList');
const form = document.getElementById('form');
const locationInput = document.getElementById('location');
const description = document.getElementById('description');
const fullTimeInput = document.getElementById('checkBox');
const toggleInput = document.getElementById('toggleInput');

const handleSelectJob = async (id) => {
  try {
    const res = await axios.get(
      `https://cors.bridged.cc/https://jobs.github.com/positions/${id}.json`
    );

    const detalis = jobDetails(res.data);
    content.innerHTML = detalis;
  } catch (errors) {
    console.log(errors);
  }
};

const fetchData = async (params = {}) => {
  try {
    const res = await axios.get(
      'https://cors.bridged.cc/https://jobs.github.com/positions.json',
      { params }
    );

    return res.data;
  } catch (errors) {
    console.log(errors);
  }
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

const renderJobs = async (params = {}) => {
  const jobs = await fetchData(params);

  jobs.forEach((job) => {
    const card = JobCard(job);
    jobsList.append(card);
    card.addEventListener('click', () => {
      handleSelectJob(card.id);
    });
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const params = {};
  if (locationInput.value) params.location = locationInput.value;
  if (description.value) params.location = description.value;
  if (fullTimeInput.checked) params.full_time = 'on';
  jobsList.innerHTML = '';
  renderJobs(params);
});

toggleInput.addEventListener('click', () => {
  if (toggleInput.checked) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
});

renderJobs();
