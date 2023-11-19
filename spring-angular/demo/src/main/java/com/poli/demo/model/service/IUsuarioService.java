package com.poli.demo.model.service;

import com.poli.demo.model.entity.Usuario;

public interface IUsuarioService {
    public java.util.List<Usuario> listar();
    public Usuario crear(Usuario usuario);
    public void eliminar(Long id);
    public Usuario buscarId(Long id);
}
