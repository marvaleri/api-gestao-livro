const cardContainer = document.getElementById('cardContainer');

let livros = [];

async function loadCards() {
    try {
        const response = await fetch('http://localhost:8080/api/livros/listarLivros');
        livros = await response.json();
        renderCards();
    } catch (error) {
        console.error('Error ao carregar livros:', error);
    }
}

function renderCards() {
    cardContainer.innerHTML = '';
    livros.forEach((livro) => {
        console.log(livro);

        const card = document.createElement('div');
        card.className = 'card';

        const image = document.createElement('img');
        image.src = livro.foto || 'https://via.placeholder.com/150';
        card.appendChild(image);

        const name = document.createElement('h3');
        name.textContent = livro.nome;
        card.appendChild(name);

        const categoria = document.createElement('p')
        categoria.textContent = `Categoria: ${livro.categoria}`;
        card.appendChild(categoria);

        const ano = document.createElement('p');
        ano.textContent = `Ano: ${livro.ano}`;
        card.appendChild(ano);

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editBook(livro);
        card.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.onclick = () => deleteBook(livro.id);
        card.appendChild(deleteButton);

        cardContainer.appendChild(card);
    });
}

async function addBook() {
    const nome = document.getElementById('nameInput').value;
    const categoria = document.getElementById('categoriaInput').value;
    const ano = document.getElementById('anoInput').value;
    const image = document.getElementById('imageInput').value;

    if (nome && categoria && ano) {
        const newBook = {
            nome: nome,
            categoria: categoria,
            ano: ano,
            foto: image
        };

        try {
            const response = await fetch('http://localhost:8080/api/livros/cadastrarLivro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (response.ok) {
                loadCards();
                clearForm();
            } else {
                console.error('Erro ao cadastrar livro:', await response.text());
            }
        } catch (error) {
            console.error('Erro ao cadastrar livro:', error);
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

async function editBook(livro) {
    document.getElementById('nameInput').value = livro.nome;
    document.getElementById('categoriaInput').value = livro.categoria;
    document.getElementById('anoInput').value = livro.ano;
    document.getElementById('imageInput').value = livro.foto;

    const addButton = document.querySelector('.form-container button');
    addButton.textContent = 'Salvar Alterações';
    addButton.onclick = () => saveEdit(livro.id);
}

async function saveEdit(id) {
    const nome = document.getElementById('nameInput').value;
    const categoria = document.getElementById('categoriaInput').value;
    const ano = document.getElementById('anoInput').value;
    const image = document.getElementById('imageInput').value;

    const updatedBook = {
        nome: nome,
        categoria: categoria,
        ano: ano,
        foto: image
    };

    try {
        const response = await fetch(`http://localhost:8080/api/livros/atualizarLivro/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook),
        });

        if (response.ok) {
            loadCards();
            clearForm();
            const addButton = document.querySelector('.form-container button');
            addButton.textContent = 'Adicionar Livro';
            addButton.onclick = addBook;
        } else {
            console.error('Erro ao editar livro:', await response.text());
        }
    } catch (error) {
        console.error('Erro ao editar livro:', error);
    }
}

async function deleteBook(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/livros/deletarLivro/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            loadCards();
        } else {
            console.error('Erro ao deletar livro:', await response.text());
        }
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
    }
}

function clearForm() {
    document.getElementById('nameInput').value = '';
    document.getElementById('categoriaInput').value = '';
    document.getElementById('anoInput').value = '';
    document.getElementById('imageInput').value = '';
}

loadCards();