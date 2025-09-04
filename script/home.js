const params = new URLSearchParams(window.location.search);
const userId = params.get('user');

if (!userId) {
	document.body.innerHTML = `<h2>Utilisateur non identifié</h2>`;
} else {
	fetch(`http://localhost:1336/dashboard/auth/user/${userId}`)
		.then(res => res.json())
		.then(data => {
			document.getElementById('username').textContent = data.username;
            const avatarExtension = data.avatar.startsWith('a_') ? 'gif' : 'png';
			document.getElementById('avatar').src = `https://cdn.discordapp.com/avatars/${data.discord_id}/${data.avatar}.${avatarExtension}`;
		})
		.catch(err => {
			console.error(err);
			document.body.innerHTML = '<h2>Erreur lors du chargement des ressources</h2>';
		});
}

document.getElementById('invite-btn').addEventListener('click', () => {
	window.location.href = "https://discord.com/oauth2/authorize?client_id=1265435365280448603&permissions=8&integration_type=0&scope=bot+applications.commands";
})	