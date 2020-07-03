import * as React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TodoScreen from './src/pages/TodoScreen';


const Tab = createMaterialTopTabNavigator();
export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
          name="A fazer" component={TodoScreen} initialParams={{current: 'todo', next: 'doing' }} />
          <Tab.Screen name="Em andamento" component={TodoScreen} initialParams={{current: 'doing', next: 'done' }} />
          <Tab.Screen name="Concluído" component={TodoScreen} initialParams={{current: 'done', next: null }} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}


