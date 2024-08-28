import { supabase } from '@/lib/supabase'; // Adjust the import path as needed

interface UserSignUpData {
    email: string;
    username: string;
}

export async function createUser({
    email,
    username,
    ...additionalData
}: UserSignUpData) {
    try {
        // Step 1: Sign up the user using Supabase Auth
        // const { data: authData, error: authError } = await supabase.auth.signUp({
        //   email,
        //   password,
        // });

        // if (authError) throw authError;

        // if (!authData.user) throw new Error('User creation failed');

        // Step 2: Add additional user data to your 'users' table
        const { data: userData, error: userError } = await supabase
            .from('users')
            .insert([
                {
                    //   id: authData.user.id,
                    email,
                    username,
                    ...additionalData,
                },
            ])
            .select()
            .single();

        if (userError) throw userError;

        return { user: userData, error: null };
    } catch (error) {
        console.log('Error creating user:', error);
        return { user: null, error };
    }
}

// Example usage:
// const { user, error } = await createUser({
//   email: 'user@example.com',
//   password: 'securepassword',
//   username: 'newuser123',
//   fullName: 'New User',
//   // Add any other fields you want to store
// });