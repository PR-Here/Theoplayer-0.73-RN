/**
 * Sample React Native App with THEOplayer
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {THEOplayerView} from 'react-native-theoplayer';
import type {THEOplayer} from 'react-native-theoplayer';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const playerRef = useRef<THEOplayer>(null);
  const [playerStatus, setPlayerStatus] = useState('Initializing...');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const playerConfig = {
    license:
      'sZP7IYe6T6P1IKIK0uAgCZkgIDxKFSaoIuR-CSfo0mkKTDCc0DhtIuft3SC6FOPlUY3zWokgbgjNIOf9fKPe3Qac3L3eFSCrID0-3QxgTOz_IlUKFD0L3SBL3L46Cl4e36fVfK4_bQgZCYxNWoryIQXzImf90Sbt0u5Z3lai0u5i0Oi6Io4pIYP1UQgqWgjeCYxgflEc3Lhc3uCi0Sfc0SfcFOPeWok1dDrLYtA1Ioh6TgV6v6fVfKcqCoXVdQjLUOfVfGxEIDjiWQXrIYfpCoj-fgzVfKxqWDXNWG3ybojkbK3gflNWf6E6FOPVWo31WQ1qbta6FOPzdQ4qbQc1sD4ZFK3qWmPUFOPLIQ-LflNWfKXpIwPqdDa6Ymi6bo4pIXjNWYAZIY3LdDjpflNzbG4gFOPKIDXzUYPgbZf9DZPEIY3if6i6UQ1gWoXebZPUya',
  };

  const source = {
    sources: [
      {
        src: 'https://cdn.theoplayer.com/video/big_buck_bunny/big_buck_bunny.m3u8',
        type: 'application/x-mpegurl',
      },
    ],
  };

  const onPlayerReady = (player: THEOplayer) => {
    setPlayerStatus('Player ready callback');
    player.source = source;
    player.autoplay = true;
    setPlayerStatus('Source set via callback');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (playerRef.current) {
        setPlayerStatus('Player ready, setting source...');
        
        // Set source and autoplay
        playerRef.current.source = source;
        playerRef.current.autoplay = true;
        
        setPlayerStatus('Source set, should be playing...');
      } else {
        setPlayerStatus('Player ref is null');
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={[styles.container, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.debugContainer}>
        <Text style={styles.debugText}>Status: {playerStatus}</Text>
      </View>
      <THEOplayerView 
        ref={playerRef}
        config={playerConfig}
        onPlayerReady={onPlayerReady}
        style={styles.player}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  debugContainer: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  debugText: {
    color: 'white',
    fontSize: 12,
  },
  player: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: 'black',
  },
});

export default App;
