function uploadImagem(imagem) {
    const enderecoImagem = imagem.getAttribute('src');
    const altImagem = imagem.getAttribute('alt');

    document.querySelector('.modal-container .modal-imagem').innerHTML = `<img src="${enderecoImagem}" alt="${altImagem}" class="imagem-modal" />`;

    document.querySelector('.modal-container').classList.add('visivel');
}

function modal() {
    const imagens = document.querySelectorAll('.galeria img:not(.esconder)');

    document.querySelector('.total-imagens').textContent = Array.from(imagens).length;

    imagens.forEach((imagem) => {
        imagem.addEventListener('click', function (evento) {
            uploadImagem(evento.target)
        });
    });


    document.querySelector('.modal-container .botao-sair').addEventListener('click', function () {
        document.querySelector('.modal-container').classList.remove('visivel');

        document.querySelector('.modal-container .modal-imagem').innerHTML = '';
    });
}

const pesquisa = document.querySelector('.pesquisa input');
pesquisa.addEventListener('input', function (evento) {
    document.querySelectorAll('.galeria img').forEach((elemento) => elemento.classList.add('esconder'));

    const busca = evento.target.value;

    if (!busca) {
        document.querySelectorAll('.galeria img').forEach((elemento) => elemento.classList.remove('esconder'));

        modal();

        return false;
    }

    const imagensEncontradas = document.querySelectorAll(`.galeria img[alt*="${busca}"]`);

    imagensEncontradas.forEach((imagem) => {
        imagem.classList.remove('esconder');
    });

});

const galeria = document.getElementById('galeria');

document.addEventListener('DOMContentLoaded', function () {
    console.log('coisaaaaaaa')
    const input = document.getElementById('input-imagem');
    const galeria = document.querySelector('.galeria');

    input.addEventListener('change', function (event) {
        const arquivos = event.target.files;

        for (let i = 0; i < arquivos.length; i++) {
            console.log('n:', arquivos.length)
            const arquivo = arquivos[i];

            if (arquivo) {
                const leitor = new FileReader();

                leitor.onload = function (e) {
                    const novaImagem = document.createElement('img');
                    novaImagem.id = "imagem-preview"
                    novaImagem.src = e.target.result;
                    novaImagem.style.maxWidth = '500px';
                    novaImagem.addEventListener("click", function () {
                        uploadImagem(novaImagem)
                    });

                    galeria.appendChild(novaImagem);

                    document.querySelector('.total-imagens').textContent = Array.from(document.querySelectorAll('.galeria img:not(.esconder)')).length;
                };

                leitor.readAsDataURL(arquivo);
            }
        }
    });
});


modal();