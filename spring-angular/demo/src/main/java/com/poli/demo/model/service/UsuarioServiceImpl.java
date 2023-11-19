package com.poli.demo.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.poli.demo.model.dao.IUsuarioDao;
import com.poli.demo.model.entity.Usuario;

@Service
public class UsuarioServiceImpl implements IUsuarioService {

    @Autowired
    IUsuarioDao usuarioDao;

    @Override
    @Transactional(readOnly = true)
    public List<Usuario> listar() {
        return  (List<Usuario>)  usuarioDao.findAll();
    }

    @Override
    public Usuario crear(Usuario usuario) {
        return usuarioDao.save(usuario);
    }

    @Override
    public void eliminar(Long id) {
        usuarioDao.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario buscarId(Long id) {
       return usuarioDao.findById(id).orElse(null);
    }
    
}
