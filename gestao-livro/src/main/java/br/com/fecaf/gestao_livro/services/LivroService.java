package br.com.fecaf.gestao_livro.services;

import br.com.fecaf.gestao_livro.model.Livro;
import br.com.fecaf.gestao_livro.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    //Listar
    public List<Livro> ListarLivros() {
        return livroRepository.findAll();
    }

    //Criar
    public Livro salvarLivro (Livro livro) {
        return livroRepository.save(livro);
    }

    //Deletar
    public void deletarLivro (int id) {
        livroRepository.deleteById(id);
    }

    //Atualizar
    public Livro atualizarLivro (int id, Livro livroDetails) {
        Livro livro = livroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        livro.setNome(livroDetails.getNome());
        livro.setCategoria(livroDetails.getCategoria());
        livro.setAno(livroDetails.getAno());
        livro.setFoto(livroDetails.getFoto());

        return livroRepository.save(livro);
    }
}
