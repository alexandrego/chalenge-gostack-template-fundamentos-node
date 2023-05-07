import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();

    return response.status(200).json({
      transactions,
      balance,
    });

  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    } else {
      return response.status(400).json({ message:'Unexpected error', err })
    }
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(
      transactionsRepository
    );

    const transaction = createTransaction.execute({
      title,
      value,
      type,
    });

    return response.status(200).json(transaction);

  } catch (err) {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    } else {
      return response.status(400).json({ message:'Unexpected error', err })
    }
  }
});

export default transactionRouter;
