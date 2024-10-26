import axios from 'axios';

// const postData = {
//   title: 'Lo-Fi Mix',
//   prompt: 'lofi music bam bam boom boom',
//   gpt_description_prompt: '',
//   custom_mode: false,
//   make_instrumental: false,
//   model: 'chirp-v3.0',
//   callback_url: '',
//   disable_callback: true,
//   token: 'c963c008-4287-4ef4-b67d-6cee7e8bf7e2'
// };

// axios.post('https://udioapi.pro/api/generate', postData, {
//   headers: {
//     'Content-Type': 'application/json',
//   }
// })
//   .then(response => {
//     console.log('Success:', response.data);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });


  // e2c9ceef-8010-4593-bcbc-a67b6f213550

const workId = 'e2c9ceef-8010-4593-bcbc-a67b6f213550'; // Replace with your actual work ID

axios.post(`https://udioapi.pro/api/feed?workId=${workId}`)
  .then(response => {
    console.log('Success:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
