const content = document.getElementById('content');
const jobsList = document.getElementById('jobsList');
const form = document.getElementById('form');
const locationInput = document.getElementById('location');
const description = document.getElementById('description');
const fullTimeInput = document.getElementById('checkBox');
const toggleInput = document.getElementById('toggleInput');
const logo = document.getElementById('logo');

const jobsData = [];

// fetch single job

const handleSelectJob = async (id) => {
  const detalis = jobDetails(job);
  console.log(res.data);
  content.innerHTML = detalis;
};

// fetch all Jobs list

const fetchData = async (params = {}) => {
  try {
    const res = await axios.get('./data.json', { params });
    console.log(res.data);
    return res.data;
  } catch (errors) {
    console.log(errors);
  }
};

// create job card

const JobCard = (job) => {
  const card = document.createElement('div');
  card.classList.add('job-card');
  card.id = job.id;

  card.innerHTML = `
  <img class="company-logo" src=${job.logo} alt=${job.company}>
  <div class="card-content">
    <p>${job.postedAt}   ${job.contract}</p>
    <h3>${job.position}</h3>
    <p>${job.company}</p>
    <p class="location">${job.location}</p>
  </div>
   
   `;

  return card;
};

// show job details

const jobDetails = (job) => {
  const details = `

  <div class="flex job-header container">
  ${companyLogo(job)}
  <h2>${job.company}</h2>
  <button class="btn"><a href="${job.company_url}">Company Site</a></button>
 </div>
  <div class="container job-details">

    <p class="margin-l">${job.type} <span >.${getTimeByDifference(
    job.created_at
  )}</span></p>
    <div class="flex">
     <h1 "class="margin-l">${job.position}</h1>
     <button class="btn"><a href="${job.how_to_apply}">Apply Now</a></button>
    </div>
    <p class="location">${job.location}</p>
  <div class="job-description">${job.description}</div>
    <h3 class="margin-l">${job.title}</h3>
    <p>${job.company}</p>
  </div>
  </div>

 `;

  return details;
};

// render All jobs list

const createJobList = async (params = {}) => {
  const jobs = await fetchData(params);
  if (!jobs.length) {
    jobsList.innerHTML =
      '<h3 class="message">There is no jobs with these description</h3>';
  } else {
    jobs.forEach((job) => {
      const card = JobCard(job);
      jobsList.append(card);
      card.addEventListener('click', () => {
        handleSelectJob(card.id);
      });
    });
  }
};

const renderJobs = () => {
  const params = {};
  if (locationInput.value) params.location = locationInput.value;
  if (description.value) params.location = description.value;
  if (fullTimeInput.checked) params.full_time = 'on';
  jobsList.innerHTML = '';
  createJobList(params);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  renderJobs();
});

// dark and light theme

toggleInput.addEventListener('click', () => {
  if (toggleInput.checked) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
});

logo.addEventListener('click', () => window.location.reload());

createJobList();
