package br.com.fecaf.gestao_livro.Controller;

import br.com.fecaf.gestao_livro.model.Livro;
import br.com.fecaf.gestao_livro.services.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
@CrossOrigin(origins = "http://127.0.0.1:5500", allowedHeaders = "*")
public class LivroController {

    @Autowired
    private LivroService livroService;

    //listar contatos
    @GetMapping("/listarLivros")
    public List<Livro> ListarLivros() { return livroService.ListarLivros();  }

    @PostMapping("/cadastrarLivro")
    public ResponseEntity<Livro> salvarLivro(@RequestBody Livro livro) {
        Livro newLivro = livroService.salvarLivro(livro);
        return ResponseEntity.status(HttpStatus.CREATED).body(newLivro);
    }

    @DeleteMapping("/deletarLivro/{id}")
    public ResponseEntity<Void> deletarLivro(@PathVariable int id) {
        livroService.deletarLivro(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @PutMapping("/atualizarLivro/{id}")
    public ResponseEntity<Livro> updateProduct(@PathVariable int id, @RequestBody Livro livroDetails) {
        try {
            Livro livroAtualizado = livroService.atualizarLivro(id, livroDetails);
            return new ResponseEntity<>(livroAtualizado, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
