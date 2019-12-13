const Bank = require('../models/banks')
const User = require('../models/users')

exports.createBank = async (req, res) => {
    try {
        const user = await User.findOne({sname: req.body.sname})
        if(!user){
            return res.status(404).json({
                message:'User not found'
            })
        }
        else{
            const {bankname, account } = req.body
            if(!bankname || !account ){
                return res.status(403).json({
                    message:'Fill all fields properly'
                })
            }
            else{
                const bank = await Bank.create(req.body)
                let userId = user.id
                let bvn = user.bvn
                bank.userid = userId
                bank.bvn = bvn
                await bank.save()
                return res.status(201).json({
                    message:'Bank created',
                    bank:bank
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message:'INTERNAL SERVER ERROR',
            error: error.message
        })
    }
}


//update bank details
exports.updateBank = async (req, res) => {
    try {
        const info = await Bank.findOne({_id: req.params.id})
        if(!info){
            return res.status(404).json({
                message:'Bank not found'
            })
        }
        else{
            const {bankname, account } = req.body
            info.bankname = bankname || info.bankname
            info.account = account || info.account
            await info.save()
            return res.status(200).json({
                message:'update successful',
                info: info
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:'INTERNAL SERVER ERROR',
            error: error
        }) 
    }
}