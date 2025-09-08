document.getElementById("invite-btn").addEventListener("click", () => {
	window.location.href = `https://discord.com/oauth2/authorize?client_id=1265435365280448603&permissions=8&integration_type=0&scope=bot+applications.commands`
});

document.getElementById('login-btn').addEventListener("click", () => {
	window.location.href = 'https://discord.com/oauth2/authorize?client_id=1280974699735814206&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdashboard%2Fauth%2Fcallback&scope=identify+email+connections'
})