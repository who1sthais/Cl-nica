// routes/paciente.js
const express = require('express');
const router = express.Router();
const sequelize = require('../models/db');
const Paciente = require('../models/paciente');
// Sincroniza o modelo com o banco de dados
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
});
router.get('/', (req, res) => {
   res.render('layout', {title: 'Menu',body: 'pacientes'});
    });
 router.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();//select * from ...
    res.status(200);
    res.render('pacientes', {
      title: 'Lista de Pacientes',body: 'pacientes',pacientes: pacientes
    });}
  catch (error) {
    res.status(500);
    return res.render('error',{ title:'Erro',message:error.message,error:error});
  }
});
    

router.get('/pacientes/add', (req, res) => {
  res.render('addpaciente', { title: 'Adicionar Paciente' });
});
router.post('/pacientes/add', async (req, res) => {
  try {
    const paciente = await Paciente.create(req.body);
    res.status(201);
    res.redirect('/pacientes');
  } catch (error) {
    res.status(400);
    return res.render('error',{title:'Erro',message:error.message,error:error });
  }    
  });

router.get('/pacientes/update', async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();
    res.render('updatepaciente', { pacientes:pacientes, title:'Atualizar Paciente' });
  } catch (error) {
    res.status(500);
    return res.render('error',{title:'Erro',message:error.message,error:error });
  }
  }); 

router.get('/pacientes/update/:CPF', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.CPF);
    if (!paciente) {
      return res.status(404);
      return res.render('error',{title:'Erro',message:error.message,error:error });
    }
    res.json(paciente);
  } catch (error) {
    res.status(500);
    return res.render('error',{title:'Erro',message:error.message,error:error });
  }
});
router.post('/pacientes/update', async (req, res) => {
  const { pacienteCPF, Nome, Idade, DiaMarcado, HoraMarcada } = req.body;
  try {
    await Paciente.update({ Nome, Idade, DiaMarcado, HoraMarcada }, {
      where: { CPF: pacienteCPF }
    });
    res.status(204);
    res.redirect('/pacientes'); // Redireciona para a página inicial ou outra página após a atualização
  } catch (error) {
    res.status(500);
    return res.render('error',{title:'Erro',message:error.message,error:error });
  }
});


router.get('/pacientes/delete', (req, res) => {
  res.render('deletepaciente', { title: 'Apagar Paciente' });
});
router.post('/pacientes/delete', async(req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.body.CPF);
    if (!paciente) {res.status(404);
      return res.render('error',{ title:'Erro',
        message:"Paciente não encontrado",error:"" });
    }
    await paciente.destroy(); res.status(204); res.redirect('/pacientes');
  } catch (error) {res.status(500);
   return res.render('error',{ title:'Erro',message: error.message,error: error});
  }
});
module.exports = router;
