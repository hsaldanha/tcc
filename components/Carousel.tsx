import { restrictionsDb } from "@/db/diet";
import { Feather } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  ImageProps,
  Pressable,
  Text,
  View,
} from "react-native";
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const CARD_WIDTH = 300;
const SCREEN_WIDTH = Dimensions.get("screen").width;

const carouselItems = [
  restrictionsDb[0],
  restrictionsDb[6],
  restrictionsDb[2],
  restrictionsDb[5],
  restrictionsDb[9],
];

export function Carousel() {
  const scrollXOffset = useSharedValue(0);

  const [isFirstCard, setIsFirstCard] = useState(scrollXOffset.value === 0);
  const [isLastCard, setIsLastCard] = useState(false);
  const [scrollViewWidth, setScrollViewWidth] = useState(0);

  const scrollRef = useRef<Animated.ScrollView>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollXOffset.value = withSpring(event.contentOffset.x, {
        damping: 18,
        stiffness: 120,
      });
    },
    onMomentumEnd: (event) => {
      const scrollOffset = event.contentOffset.x;
      scrollXOffset.value = withSpring(scrollOffset, {
        damping: 18,
        stiffness: 120,
      });
      if (scrollOffset === 0) {
        runOnJS(setIsFirstCard)(true);
      } else {
        runOnJS(setIsFirstCard)(false);
      }
      if (scrollOffset === scrollViewWidth - SCREEN_WIDTH) {
        runOnJS(setIsLastCard)(true);
      } else {
        runOnJS(setIsLastCard)(false);
      }
    },
  });

  const handleContentSizeChange = (width: number, _height: number) => {
    setScrollViewWidth(width);
  };

  // Helper Functions

  const findNextNearestMultiple = (
    targetNumber: number,
    multiple: number
  ): number => {
    const quotient = Math.ceil((targetNumber + 1) / multiple);
    const nextNearestMultiple = multiple * quotient;
    return nextNearestMultiple;
  };

  const findPreviousMultiple = (
    targetNumber: number,
    multiple: number
  ): number => {
    const quotient = Math.floor((targetNumber - 1) / multiple);
    const previousMultiple = multiple * quotient;
    return previousMultiple;
  };

  const goToNext = () => {
    if (scrollXOffset.value < scrollViewWidth - SCREEN_WIDTH) {
      const nextMultiple = findNextNearestMultiple(
        scrollXOffset.value,
        CARD_WIDTH
      );

      scrollRef.current?.scrollTo({ x: nextMultiple, animated: true });
    }
  };

  const goToPrevious = () => {
    if (scrollXOffset.value !== 0) {
      const nextMultiple = findPreviousMultiple(
        scrollXOffset.value,
        CARD_WIDTH
      );

      scrollRef.current?.scrollTo({ x: nextMultiple, animated: true });
    }
  };

  const handleCarouselItemPress = (scrollOffset: number) => {
    scrollRef.current?.scrollTo({ x: scrollOffset, animated: true });
  };

  return (
    <View>
      <Animated.View style={{ overflow: "visible" }}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          onScroll={scrollHandler}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          decelerationRate={0}
          style={{ overflow: "visible" }}
          contentContainerStyle={{ overflow: "visible", gap: 6 }}
          onContentSizeChange={handleContentSizeChange}
        >
          {carouselItems.map((item: any, index: number) => (
            <GalleryCarouselItem
              key={index}
              {...{
                item,
                index,
                scrollXOffset,
                handleCarouselItemPress,
                scrollViewWidth,
              }}
            />
          ))}
        </Animated.ScrollView>
        <Animated.View
          style={{
            paddingHorizontal: 4,
            flex: 1,
            flexDirection: "row",
            paddingTop: 5,
          }}
        >
          <Pressable
            disabled={isFirstCard}
            onPress={goToPrevious}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#f3f4f6" : "",
              borderRadius: pressed ? 12 : 0,
              marginRight: 2,
              padding: 2,
            })}
          >
            <Animated.View>
              <Feather
                name="arrow-left"
                style={{
                  color: isFirstCard ? "#99a1af" : "black",
                }}
              />
            </Animated.View>
          </Pressable>
          <Pressable
            disabled={isLastCard}
            onPress={goToNext}
            style={({ pressed }) => ({
              backgroundColor: pressed ? "#f3f4f6" : "",
              borderRadius: pressed ? 12 : 0,
              marginRight: 2,
              padding: 2,
            })}
          >
            <Animated.View>
              <Feather
                name="arrow-right"
                style={{
                  color: isLastCard ? "#99a1af" : "black",
                }}
              />
            </Animated.View>
          </Pressable>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

type GalleryCarouselItemProps = {
  item: { image: ImageProps["source"]; title: string };
  index: number;
  scrollXOffset: SharedValue<number>;
  handleCarouselItemPress: (scrollOffset: number) => void;
  scrollViewWidth: number;
};

const GalleryCarouselItem = (props: GalleryCarouselItemProps) => {
  const { item } = props;

  return (
    <Animated.View
      key={item.title}
      style={{
        width: CARD_WIDTH,
        height: 192,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <ImageBackground
        blurRadius={1}
        source={item.image}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#00000067",
            position: "absolute",
          }}
        ></View>
        <Text
          style={{
            fontSize: 24,
            color: "white",
            textShadowColor: "black",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 12,
            textAlign: "center",
          }}
        >
          {item.title}
        </Text>
      </ImageBackground>
    </Animated.View>
  );
};
