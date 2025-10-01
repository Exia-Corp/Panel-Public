const params = new URLSearchParams(window.location.search);
const userId = params.get('user');

if (!userId) {
	document.body.innerHTML = `<h2>Utilisateur non identifié</h2>`;
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

const inviteBtn = document.getElementById('invite-btn');
if (inviteBtn) {
	inviteBtn.addEventListener('click', () => {
		window.location.href =
			"https://discord.com/oauth2/authorize?client_id=1265435365280448603&permissions=8&integration_type=0&scope=bot+applications.commands";
	});
}