package com.poli.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.poli.demo.model.entity.Usuario;
import com.poli.demo.model.service.IUsuarioService;


@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/poli/api/v1")
public class UsuarioRestController {
    
    @Autowired
    IUsuarioService usuarioServiceImpl;


    @GetMapping("/usuarios")
    public List<Usuario> listarUsuarios(){
        return usuarioServiceImpl.listar();
    }

    @PostMapping("/usuarios")
    public Usuario crearUsuario(@RequestBody Usuario usuario) {
        return usuarioServiceImpl.crear(usuario);
    }


    @PutMapping("usuarios/{id}")
    public Usuario editarUsuario(@RequestBody Usuario usuario, @PathVariable Long id){
        Usuario usuarioEditar = usuarioServiceImpl.buscarId(id);


        usuarioEditar.setNombre(usuario.getNombre());
        usuarioEditar.setApellidos(usuario.getApellidos());
        usuarioEditar.setEdad(usuario.getEdad());
        
        return usuarioServiceImpl.crear(usuarioEditar);


    }

    @DeleteMapping("/usuarios/{id}")
    public void eliminarUsuario(@PathVariable Long id) {
        usuarioServiceImpl.eliminar(id);
    }



    @GetMapping("/usuarios/{id_rut}")
    public Usuario buscarUsuarioId(@PathVariable Long id_rut){
        return usuarioServiceImpl.buscarId(id_rut);
    }



}
