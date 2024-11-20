const express = require('express');
const Employee = require('../models/Employee');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/employees', authMiddleware, async (req, res) => {
    try{
        const employees = await Employee.find();
        res.status(200).json(employees)
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get('/employees/search', authMiddleware, async (req, res) => {
    const { department, position } = req.query;

    const query = {};
    if (department) query.department = { $regex: department, $options: 'i' };
    if (position) query.position = { $regex: position, $options: 'i' };

    try {
        const employees = await Employee.find(query);
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/employees/:eid', authMiddleware, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/employees', 
    authMiddleware,
    [
        body('first_name', 'First name is required').notEmpty(),
        body('last_name', 'Last name is required').notEmpty(),
        body('email', 'Invalid email').isEmail(),
        body('position', 'Position is required').notEmpty(),
        body('salary', 'Salary must be a number').isNumeric(),
        body('date_of_joining', 'Invalid date').isDate(),
        body('department', 'Department is required').notEmpty()
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        try{
            const {first_name, last_name, email, position, salary, date_of_joining, department} = req.body;

            let employee = await Employee.findOne({email});
            if(employee){
            return res.status(400).json({message: 'Employee already exists'});
            }
            
            employee = new Employee({
                first_name,
                last_name,
                email,
                position,
                salary,
                date_of_joining,
                department
            });

            await employee.save();

            res.status(201).json({message: 'Employee created successfully', employee_id: employee._id});
        } catch(err){
            res.status(500).json({message: 'Server error'});
        }
});

router.put('/employees/:eid', 
    authMiddleware,
    [
       body('first_name').optional().notEmpty().withMessage('First name cannot be empty'),
       body('last_name').optional().notEmpty().withMessage('Last name cannot be empty'),
       body('email').optional().isEmail().withMessage('Invalid email address'),
       body('position').optional().notEmpty().withMessage('Position cannot be empty'),
       body('salary').optional().isNumeric().withMessage('Salary must be a number'),
       body('date_of_joining').optional().isDate().withMessage('Invalid date'),
       body('department').optional().notEmpty().withMessage('Department cannot be empty') 
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('Validation errors:', errors.array());
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            console.log(`PUT /employees/${req.params.eid} called`);
            console.log('Request body:', req.body);

            const employee = await Employee.findById(req.params.eid);
            if (!employee) {
                console.log('Employee not found');
                return res.status(404).json({ message: 'Employee not found' });
            }

            employee.first_name = req.body.first_name || employee.first_name;
            employee.last_name = req.body.last_name || employee.last_name;
            employee.email = req.body.email || employee.email;
            employee.position = req.body.position || employee.position;
            employee.salary = req.body.salary || employee.salary;
            employee.date_of_joining = req.body.date_of_joining || employee.date_of_joining;
            employee.department = req.body.department || employee.department;

            await employee.save();
            console.log('Employee updated successfully:', employee);

            res.status(200).json({ message: 'Employee details updated successfully', employee });
        } catch (err) {
            console.error('Error updating employee:', err.message);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

router.delete('/employees/', authMiddleware, async (req, res) => {
    try{

        const {eid} = req.query;

        if(!eid){
            return res.status(400).json({message: 'Employee ID is required'});
        }

        const employee = await Employee.findByIdAndDelete(eid);

        if(!employee){
            return res.status(404).json({message: 'Employee not found'});
        }

        res.status(200).json({message: 'Employee deleted successfully'});
    } catch(err){
        res.status(500).json({message: 'Server error'});
    }
});

module.exports = router;