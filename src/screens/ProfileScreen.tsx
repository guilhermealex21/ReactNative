import { View, Text, ActivityIndicator } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { UserProfile } from '../types/UserProfile';

export default function ProfileScreen() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    async function loadProfile() {
        if (!user) return;

        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
        }

        setLoading(false);
    }

    loadProfile();
}, [user]);
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

    if (!profile) {
    return <Text>No profile found.</Text>;
  }

    return (
        <View>
           <Text>Name: {profile.name}</Text>
           <Text>Email: {profile.email}</Text>
           <Text>Criado em: {profile.createdAt}</Text>
        </View>
    );
}
