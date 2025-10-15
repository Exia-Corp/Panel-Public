console.log("✅ changelogs.js chargé !");

const userId = window.localStorage.getItem('buyerId')

try {
    if (!userId) {
        document.body.innerText = "Utilisateur non connecter"
    } else {
        console.log("userId récupéré :", userId);
    
    	fetch(`http://localhost:3000/dashboard/auth/user/${userId}`, {
    		method: "GET",
    		headers: {
    			"Content-Type": 'application/json',
    			"Authorization": 'Bearer KEY-9e2e9b18fcb108ff9435-API'
    		}
    	})
    		.then(res => res.json())
    		.then(data => {
    			console.log(data)
    
    			const usernameEl = document.querySelector('#username');
    			const avatarEl = document.querySelector('#avatar');
    
    			if (usernameEl) {
    				if (data.username) {
    					usernameEl.textContent = data.username;
    				} else {
    					usernameEl.textContent = 'discord'
    				}
    			}
    
    			if (avatarEl) {
    				if (data.avatar) {
    					const avatarExtension = data.avatar.startsWith('a_') ? 'gif' : 'png';
    					avatarEl.src = `https://cdn.discordapp.com/avatars/${data.user_id}/${data.avatar}.${avatarExtension}`;
    				} else {
    					avatarEl.src = `https://cdn.discordapp.com/embed/avatars/0.png`;
    				}
    			}
    	})
		.catch(err => {
	        console.error(err);
    	    document.body.innerText = 'Erreur lors du chargement des ressources';
    	});
    }
} catch (error) {
    console.info(error)
}

const changeDiv = document.getElementById('changelogs')

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('changelogs');

    async function loadChangelogs() {
        try {
            fetch('http://localhost:3000/dashboard/changelogs/show/all', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer KEY-9e2e9b18fcb108ff9435-API'
                }
            })
            .then(res => res.json())
            .then(data => {
                container.innerHTML = "";
                

                const serviceMap = {
                    app: "Application",
                    api: "API",
                    docs: "Documentation",
                    dashboard: "Dashboard"
                };

                Object.entries(data).forEach(([service, changelogs]) => {
                    changelogs.forEach(log => {
                        const card = document.createElement("div");
                        card.className = "changelog-card";

                        const services = serviceMap[service] || service;

                        card.innerHTML = `
                            <h3>${services} - v${log.version}</h3>
                            <p class="changelog-text">${log.change}</p>
                        `;

                        container.appendChild(card);
                    });
                });
            })
            .catch(err => console.error(err));
        } catch (err) {
            console.error("Erreur fetch changelogs:", err);
            container.innerHTML = `<p class="error">Impossible de charger les changelogs 😢</p>`;
        }
    }

    loadChangelogs();
});

document.addEventListener('click', (e) => {
    console.log(e)
})