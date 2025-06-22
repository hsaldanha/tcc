import { restrictionsDb } from "@/db/diet";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ImageBackground,
  ImageProps,
  Pressable,
  Text,
  View,
} from "react-native";
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const CARD_WIDTH = 300;

const carouselItems = [
  restrictionsDb[0],
  restrictionsDb[6],
  restrictionsDb[2],
  restrictionsDb[5],
  restrictionsDb[9],
];

export function Carousel() {
  const scrollXOffset = useSharedValue(0);
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
    },
  });

  const handleContentSizeChange = (width: number, _height: number) => {
    setScrollViewWidth(width);
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
      </Animated.View>
    </View>
  );
}

type GalleryCarouselItemProps = {
  item: { id: string, image: ImageProps["source"]; title: string };
  index: number;
  scrollXOffset: SharedValue<number>;
  handleCarouselItemPress: (scrollOffset: number) => void;
  scrollViewWidth: number;
};

const GalleryCarouselItem = (props: GalleryCarouselItemProps) => {
  const { item } = props;
  const router = useRouter()

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
      <Pressable onPress={() => {
        router.push({
          pathname: "/details/restriction/[restrictionId]",
          params: {
            restrictionId: item.id
          }
        })
      }}>
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
      </Pressable>
    </Animated.View>
  );
};
