const f = document.getElementById('f');
const list = document.getElementById('list');

f.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  await fetch('/users/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });

  f.reset();
  load();
});

async function load() {
  const res = await fetch('/users');
  const users = await res.json();
  list.innerHTML = '';
  users.forEach(u => {
    const li = document.createElement('li');
    li.textContent = `${u.name} — ${u.email}`;
    list.appendChild(li);
  });
}

load();
