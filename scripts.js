document.addEventListener('DOMContentLoaded', function () {



    let tg = window.Telegram.WebApp;
    tg.expand();


    const TELEGRAM_API_TOKEN = '7390673577:AAGDg1f_94b3RMwOIbDNHR1kB2ZcuOIGh_0';
    const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}`;

    async function getUserProfilePhotos(userId) {
        const url = `${TELEGRAM_API_URL}/getUserProfilePhotos?user_id=${userId}&limit=1`;
        const response = await fetch(url);
        const data = await response.json();
        return data.result.photos;
    }

    async function getFileUrl(fileId) {
        const url = `${TELEGRAM_API_URL}/getFile?file_id=${fileId}`;
        const response = await fetch(url);
        const data = await response.json();
        const filePath = data.result.file_path;
        return `https://api.telegram.org/file/bot${TELEGRAM_API_TOKEN}/${filePath}`;
    }

    async function displayProfilePhoto(userId) {
        const photos = await getUserProfilePhotos(userId);

        if (photos.length > 0) {
            const photo = photos[0]; // Берем первую фотографию
            const fileId = photo[photo.length - 1].file_id; // Берем последнюю версию фото (большого размера)
            const fileUrl = await getFileUrl(fileId);
            
            console.log(fileUrl);

            // const img = document.createElement('img');
            // img.src = fileUrl;
            // img.alt = 'Profile Photo';
            // img.className = 'img-user'
            let img_user = document.getElementById('profile-user-photo');
            img_user.src = fileUrl;
        }
    }

    const userId = tg.initDataUnsafe.user.id; 
    displayProfilePhoto(userId);

    
    let p_name = document.getElementById("profile-user-name");

    p_name.innerText = `${tg.initDataUnsafe.user.first_name}`;

    let p_id = document.getElementById("profile-user-name");

    p_id.innerText = `ID: ${tg.initDataUnsafe.user.id}`;

    // let h_person = document.createElement('h2');

//    h_person.innerText = `${tg.initDataUnsafe.user.first_name}`;
    // p_person.innerText = 'Rakov'

    // personCard.appendChild(h_person);
    
    // let p_person = document.createElement('p');
    // p_person.innerText = userId
    

    // personCard.appendChild(p_person);



});