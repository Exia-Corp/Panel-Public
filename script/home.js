// Récupération de l'userId depuis le localStorage
const userId = window.localStorage.getItem('buyerId');

if (!userId) {
	document.body.innerHTML = `<h2>Utilisateur non identifié</h2>`;
} else {
	console.log("userId récupéré :", userId);

	// Requête pour récupérer les infos de l'utilisateur
	fetch(`http://localhost:3000/dashboard/auth/user/${userId}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer KEY-9e2e9b18fcb108ff9435-API"
		}
	})
	.then(res => {
		if (!res.ok) throw new Error(`Erreur API: ${res.status}`);
		return res.json();
	})
	.then(data => {
		console.log(data);

		const usernameEl = document.querySelector('#username');
		const avatarEl = document.querySelector('#avatar');

		if (usernameEl) {
			usernameEl.textContent = data.username || 'discord';
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
		document.body.innerHTML = `<h2>Erreur lors du chargement des ressources</h2>`;
	});
}

// Bouton d'invitation du bot
const inviteBtn = document.getElementById('invite-btn');
if (inviteBtn) {
	inviteBtn.addEventListener('click', () => {
		window.location.href =
			"https://discord.com/oauth2/authorize?client_id=1265435365280448603&permissions=8&integration_type=0&scope=bot+applications.commands";
	});
}
