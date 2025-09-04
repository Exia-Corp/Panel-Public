const params = new URLSearchParams(window.location.search);
const userId = params.get('user');

if (!userId) {
	document.body.innerHTML = `<h2>Utilisateur non identifié</h2>`;
} else {
	loadUserInfo(userId);
	updateLinks(userId);
}

function loadUserInfo(userId) {
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

function updateLinks(userId) {
	document.querySelectorAll('a[href]').forEach(link => {
		const href = link.getAttribute('href');
		
		// Ignore les liens externes (http...) ou ancres (#...)
		if (!href.startsWith('http') && !href.startsWith('#')) {
			const url = new URL(href, window.location.origin);
			url.searchParams.set('user', userId);
			link.href = url.toString();
		}
	});
}