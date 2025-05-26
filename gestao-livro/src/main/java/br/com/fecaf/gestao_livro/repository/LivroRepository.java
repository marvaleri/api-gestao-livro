package br.com.fecaf.gestao_livro.repository;

import br.com.fecaf.gestao_livro.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LivroRepository extends JpaRepository<Livro, Integer> {
}
