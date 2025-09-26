CREATE TABLE IF NOT EXISTS transactions ( 
    id SERIAL PRIMARY KEY,
    amount NUMERIC NOT NULL,
    type VARCHAR(10) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);