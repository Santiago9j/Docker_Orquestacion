package com.poli.demo.model.dao;

import org.springframework.data.repository.CrudRepository;

import com.poli.demo.model.entity.Usuario;

public interface IUsuarioDao extends CrudRepository<Usuario, Long>{
    
}
